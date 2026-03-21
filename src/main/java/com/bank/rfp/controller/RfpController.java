package com.bank.rfp.controller;

import com.bank.rfp.service.IngestionService;
import com.bank.rfp.service.DraftingService;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/rfp")
public class RfpController {

    private final IngestionService ingestionService;
    private final DraftingService draftingService;

    public RfpController(IngestionService ingestionService, DraftingService draftingService) {
        this.ingestionService = ingestionService;
        this.draftingService = draftingService;
    }

    // Step 1: Upload the bank documents to the Vector DB
    @PostMapping("/ingest")
    public String uploadPdf(@RequestParam("file") MultipartFile file) {
        ingestionService.ingest(file.getResource());
        return "Bank document indexed successfully!";
    }

    // Step 2: Ask the AI to draft a section based on those documents
    @GetMapping("/draft")
    public String generateDraft(@RequestParam("prompt") String prompt) {
        return draftingService.generateRfpSection(prompt);
    }
}