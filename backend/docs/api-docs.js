import YAML from 'yamljs';

const swaggerJsDocs = YAML.load('./docs/api-docs.yaml');

export default swaggerJsDocs;
