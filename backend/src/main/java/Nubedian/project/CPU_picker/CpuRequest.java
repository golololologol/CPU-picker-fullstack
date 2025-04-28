package Nubedian.project.CPU_picker;

public class CpuRequest {
    private String brand;
    private String model;
    private double clockspeed;
    private int numberOfCores;
    private int numberOfThreads;
    private int tdp;
    private double priceEur;
    private Integer socketId;

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public double getClockspeed() { return clockspeed; }
    public void setClockspeed(double clockspeed) { this.clockspeed = clockspeed; }

    public int getNumberOfCores() { return numberOfCores; }
    public void setNumberOfCores(int numberOfCores) { this.numberOfCores = numberOfCores; }

    public int getNumberOfThreads() { return numberOfThreads; }
    public void setNumberOfThreads(int numberOfThreads) { this.numberOfThreads = numberOfThreads; }

    public int getTdp() { return tdp; }
    public void setTdp(int tdp) { this.tdp = tdp; }

    public double getPriceEur() { return priceEur; }
    public void setPriceEur(double priceEur) { this.priceEur = priceEur; }

    public Integer getSocketId() { return socketId; }
    public void setSocketId(Integer socketId) { this.socketId = socketId; }
}