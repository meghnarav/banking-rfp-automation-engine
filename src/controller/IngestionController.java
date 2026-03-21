@RestController
@RequestMapping("/api/v1/ingest")
public class IngestionController {

    private final VectorStore vectorStore; // This is your pgvector DB

    public IngestionController(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @PostMapping("/pdf")
    public ResponseEntity<String> uploadRfp(@RequestParam("file") MultipartFile file) {
        // Logic Flow:
        // 1. Convert MultipartFile to Resource
        // 2. Use TikaDocumentReader to extract text
        // 3. TokenTextSplitter to chunk it
        // 4. vectorStore.accept(chunks)
        return ResponseEntity.ok("File received and processing started asynchronously.");
    }
}