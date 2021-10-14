//Feature Modal which create same structure in DB
package com.swisscom.featuretoggle.model;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
public class Feature implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,updatable = false)
    private Long id;
    private String displayName;
    private String technicalName;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date expiresOn;
    private String description;
    private Boolean inverted;
    @ElementCollection
    private List<String> customerIds;
    private Boolean archive;

    public Feature(){}
    public Feature(Long id, String displayName, String technicalName, Date expiresOn, String description, Boolean inverted, List<String> customerIds, Boolean archive) {
        this.id = id;
        this.displayName = displayName;
        this.technicalName = technicalName;
        this.expiresOn = expiresOn;
        this.description = description;
        this.inverted = inverted;
        this.customerIds = customerIds;
        this.archive = archive;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getTechnicalName() {
        return technicalName;
    }

    public void setTechnicalName(String technicalName) {
        this.technicalName = technicalName;
    }

    public Date getExpiresOn() {
        return expiresOn;
    }

    public void setExpiresOn(Date expiresOn) {
        this.expiresOn = expiresOn;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getInverted() {
        return inverted;
    }

    public void setInverted(Boolean inverted) {
        this.inverted = inverted;
    }

    public List<String> getCustomerIds() {
        return customerIds;
    }

    public void setCustomerIds(List<String> customerIds) {
        this.customerIds = customerIds;
    }

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }
}
