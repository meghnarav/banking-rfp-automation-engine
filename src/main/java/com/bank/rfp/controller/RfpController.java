package com.bank.rfp.controller;

import com.bank.rfp.service.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class RfpController {
    private final IngestionService ingestion;
    private final DraftingService drafting;

    public RfpController(IngestionService i, DraftingService d) {
        this.ingestion = i; this.drafting = d;
    }

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        ingestion.ingest(file.getResource());
        return "File Ingested Locally.";
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String message) {
        return drafting.generate(message);
    }
}