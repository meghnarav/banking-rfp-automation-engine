package com.bank.rfp.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IngestionService {
    private final VectorStore vectorStore;

    public IngestionService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void ingest(Resource pdfResource) {
        TikaDocumentReader reader = new TikaDocumentReader(pdfResource);
        TokenTextSplitter splitter = new TokenTextSplitter(800, 200, 5, 10, true);
        List<Document> docs = splitter.apply(reader.get());
        // Tagging context for the Bank
        docs.forEach(d -> d.getMetadata().put("source", pdfResource.getFilename()));
        vectorStore.accept(docs);
    }
}