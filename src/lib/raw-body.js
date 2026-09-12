'use strict';

// A request that overshoots the limit by this factor is treated as abusive rather than "a
// user picked a slightly-too-big file": the connection is cut immediately instead of being
// drained, since there is no legitimate reason a contact-form submission gets this large.
const HARD_ABORT_MULTIPLIER = 4;

/**
 * Reads a request body into a single Buffer, enforcing a byte ceiling. Once the ceiling is
 * passed, further bytes are discarded rather than buffered (so memory use stays bounded),
 * but the stream is still drained to a normal end so the server can send back a clean,
 * localized 413 response instead of the connection resetting under the client — unless the
 * body is grossly over the limit, in which case the connection is dropped outright.
 * Used by the contact route for both its urlencoded and multipart branches so there is
 * exactly one body-reading implementation to reason about.
 */
function readRawBody(req, limitBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    let overLimit = false;
    let settled = false;

    function settleReject(err) {
      if (settled) return;
      settled = true;
      reject(err);
    }

    function settleResolve(buffer) {
      if (settled) return;
      settled = true;
      resolve(buffer);
    }

    req.on('data', (chunk) => {
      if (settled) return;
      total += chunk.length;
      if (total > limitBytes) {
        overLimit = true;
        if (total > limitBytes * HARD_ABORT_MULTIPLIER) {
          const err = new Error('Request body grossly exceeds the allowed size');
          err.status = 413;
          settleReject(err);
          req.destroy();
        }
        return; // keep draining without retaining once the limit is known to be exceeded
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (overLimit) {
        const err = new Error('Request body exceeds the allowed size');
        err.status = 413;
        settleReject(err);
        return;
      }
      settleResolve(Buffer.concat(chunks, total));
    });

    req.on('error', (err) => settleReject(err));
  });
}

module.exports = { readRawBody };
