package com.swisscom.featuretoggle.repo;

import com.swisscom.featuretoggle.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeatureRepo extends JpaRepository<Feature,Long>{
    //query features by archive value
    Optional<List<Feature>> findFeaturesByArchive(Boolean archive);

    //query features by customers
    List<Feature> findByCustomerIds(String name);
}
