//Feature Request structure for API CALL
package com.swisscom.featuretoggle.model;

public class FeatureRequest {
    private FeatureReq featureRequest;

    public class FeatureReq {
        private String customerId;
        private Features[] features;

        public String getCustomerId() {
            return customerId;
        }

        public void setCustomerId(String customerId) {
            this.customerId = customerId;
        }

        public Features[] getFeatures() {
            return features;
        }

        public void setFeatures(Features[] features) {
            this.features = features;
        }
    }
    public FeatureReq getFeatureRequest() {
        return featureRequest;
    }

    public void setFeatureRequest(FeatureReq featureRequest) {
        this.featureRequest = featureRequest;
    }
}
