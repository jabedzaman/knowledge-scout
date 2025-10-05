import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";

// Initialize embeddings pipeline
let embedder: FeatureExtractionPipeline | null = null;

const VECTOR_DIMENSIONS = 384; // Dimension of the embedding vectors

/**
 * Get the embedder instance, initializing it if necessary.
 */
export const getEmbedder = async () => {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
};

/**
 * Generate embeddings for an array of texts
 * Returns an array of 384-dimensional vectors
 */
export const generateEmbeddings = async (
  texts: string[],
  batchSize: number = 32
): Promise<number[][]> => {
  const extractor = await getEmbedder();
  const allEmbeddings: number[][] = [];

  // Process in batches to avoid memory issues
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const response = await extractor(batch, {
      pooling: "mean",
      normalize: true,
    });

    const batchEmbeddings = response.tolist();
    allEmbeddings.push(...batchEmbeddings);

    console.log(
      `Processed ${Math.min(i + batchSize, texts.length)}/${
        texts.length
      } chunks`
    );
  }

  return allEmbeddings;
};
