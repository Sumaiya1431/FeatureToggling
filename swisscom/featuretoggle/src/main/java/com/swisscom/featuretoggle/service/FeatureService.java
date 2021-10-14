package com.swisscom.featuretoggle.service;

import com.swisscom.featuretoggle.exception.UserNotFoundException;
import com.swisscom.featuretoggle.model.Feature;
import com.swisscom.featuretoggle.model.FeatureRequest;
import com.swisscom.featuretoggle.model.Features;
import com.swisscom.featuretoggle.repo.FeatureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class FeatureService {
    private final FeatureRepo featureRepo;

    @Autowired
    public FeatureService(FeatureRepo featureRepo) {
        this.featureRepo = featureRepo;
    }

    public Feature addFeature(Feature feature){
        return featureRepo.save(feature);
    }

    public Feature updateFeature(Feature feature){
        return featureRepo.save(feature);
    }

    public List<Feature> findAllFeatures(){
        return featureRepo.findAll();
    }

    //find features present for particular customers
    public FeatureRequest findCustomerFeature(FeatureRequest feature){
        FeatureRequest newFeature1=feature;
        Date today = new Date();
        TimeZone.setDefault( TimeZone.getTimeZone("UTC"));
        List<Feature> allFeatures=findAllFeatures();
        List<Feature> feature1=featureRepo.findByCustomerIds(feature.getFeatureRequest().getCustomerId());
        Features[] feaLoop= feature.getFeatureRequest().getFeatures();

        for(int i=0;i<=feaLoop.length-1;i++){
            for(int j=0;j<=feature1.size()-1;j++){
                Boolean expire= today.compareTo(feature1.get(j).getExpiresOn())>0 ? true : false;
                if(feaLoop[i].getName().equals(feature1.get(j).getDisplayName()))
                {

                    if(feature1.get(j).getInverted())
                    {

                        System.out.println("i "+i+"  "+feaLoop[i].getName()+" j "+feature1.get(j).getDisplayName()+"inverted "+ feature1.get(j).getInverted());
                        feaLoop[i].setInverted(true);
                        feaLoop[i].setActive(false);
                        feaLoop[i].setExpired(expire);
                        break;
                    }
                    else
                    {
                        feaLoop[i].setInverted(false);
                        feaLoop[i].setActive(true);
                        feaLoop[i].setExpired(expire);
                        break;
                    }
                }
                else {

                    for(int k=0;k<=allFeatures.size()-1;k++){

                        if(feaLoop[i].getName().equals(allFeatures.get(k).getDisplayName())){
                            Boolean expire1= today.compareTo(allFeatures.get(k).getExpiresOn())>0 ? true : false;
                            if(expire1==true) {
                                feaLoop[i].setInverted(false);
                                feaLoop[i].setActive(true);
                                feaLoop[i].setExpired(true);
                            }
                            break;
                        }
                    }
                    if(feaLoop[i].getExpired()==null){
                        feaLoop[i].setInverted(false);
                        feaLoop[i].setActive(false);
                        feaLoop[i].setExpired(false);
                    }

                }

            }
        }
        newFeature1.getFeatureRequest().setFeatures(feaLoop);
        return newFeature1;
    }


    public List<Feature> findFeatureByArchive(Boolean archive){
        return featureRepo.findFeaturesByArchive(archive)
                .orElseThrow(()-> new UserNotFoundException("User By display name "+ archive +" not Found"));
    }

}
