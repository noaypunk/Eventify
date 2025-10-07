package com.teampura.eventify.PromotionEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Promotion {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long promoID;
    private String promoName;
    private String promoDesc;
    private double promoDiscount;
    private String startDate;
    private String endDate;

    public long getPromoID() { return promoID; }
    public void setPromoID(long promoID) { this.promoID = promoID; }

    public String getPromoName() { return promoName; }
    public void setPromoName(String promoName) { this.promoName = promoName; }

    public String getPromoDesc() { return promoDesc; }
    public void setPromoDesc(String promoDesc) { this.promoDesc = promoDesc; }

    public double getPromoDiscount() { return promoDiscount; }
    public void setPromoDiscount(double discountRate) { this.promoDiscount = discountRate; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
}
