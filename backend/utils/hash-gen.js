import crypto from 'crypto';

const hashGen = (input) => {
  const hashFunction = crypto.createHash('sha256');
  const updatedHash = hashFunction.update(input);
  const generatedHash = updatedHash.digest('hex');
  return generatedHash;
};
