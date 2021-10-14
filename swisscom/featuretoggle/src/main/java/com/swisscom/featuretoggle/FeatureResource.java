package com.swisscom.featuretoggle;

import com.swisscom.featuretoggle.model.*;
import com.swisscom.featuretoggle.service.FeatureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feature")
public class FeatureResource {
    private final FeatureService featureService;

    public FeatureResource(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Feature>> getAllFeatures(){
        List<Feature> features= featureService.findAllFeatures();
        return new ResponseEntity<>(features, HttpStatus.OK);
    }

    //get all features based on archive
    @GetMapping("/find/features/{archive}")
    public ResponseEntity<List<Feature>> getFeatureByArchive(@PathVariable("archive") Boolean archive){
        List<Feature> feature= featureService.findFeatureByArchive(archive);
        return new ResponseEntity<>(feature, HttpStatus.OK);
    }

    //api call
    @PostMapping("/find/features")
    public ResponseEntity<FeatureRes> getFeatureByCustomerId(@RequestBody FeatureRequest feature){
        FeatureRequest Feature= featureService.findCustomerFeature(feature);
        FeatureRes newFeature = new FeatureRes();
        newFeature.setFeatures(Feature.getFeatureRequest().getFeatures());
        return new ResponseEntity<>(newFeature, HttpStatus.CREATED);
    }
    
    @PostMapping("/add")
    public ResponseEntity<Feature> addFeature(@RequestBody Feature feature){
        Feature newFeature= featureService.addFeature(feature);
        return new ResponseEntity<>(newFeature, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Feature> updateEmployee(@RequestBody Feature feature) {
        Feature updateEmployee = featureService.updateFeature(feature);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }

}

