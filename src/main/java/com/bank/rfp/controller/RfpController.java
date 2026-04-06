package com.bank.rfp.controller;

import com.bank.rfp.service.DraftingService;
import com.bank.rfp.service.IngestionService;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/rfp")
@CrossOrigin(origins = "http://localhost:3000") // Connects to your React Frontend
public class RfpController {

    private final IngestionService ingestionService;
    private final DraftingService draftingService;

    public RfpController(IngestionService ingestionService, DraftingService draftingService) {
        this.ingestionService = ingestionService;
        this.draftingService = draftingService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadRfp(@RequestParam("file") MultipartFile file) {
        ingestionService.ingest(file.getResource(), "Procurement");
        return ResponseEntity.ok("Knowledge base updated with " + file.getOriginalFilename());
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generate(@RequestBody String prompt) {
        return ResponseEntity.ok(draftingService.generateRfpSection(prompt));
    }
}
