import crypto from "crypto";

const hashGen = (input) => {
  const hashFunction = crypto.createHash("sha256");
  const updatedHash = hashFunction.update(input);
  const generatedHash = updatedHash.digest("hex");
  return generatedHash;
};

console.log("Access Token", hashGen("access-token"));
console.log("Refresh Token", hashGen("refresh-token"));
