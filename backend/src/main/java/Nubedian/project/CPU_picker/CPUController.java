package Nubedian.project.CPU_picker;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/cpus")
public class CPUController {

    @Autowired
    private CPURepository cpuRepository;

    @Autowired
    private SocketRepository socketRepository;

    @GetMapping
    public List<CPU> getAllCPUs() {
        return cpuRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CPU> getCPUById(@PathVariable Integer id) {
        return cpuRepository.findById(id)
                .map(cpu -> ResponseEntity.ok(cpu))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CPU not found"));
    }

    @PostMapping
    public CPU createCPU(@RequestBody CpuRequest request) {
        Socket socket = socketRepository.findById(request.getSocketId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid socket ID"));
        CPU cpu = new CPU();
        cpu.setBrand(request.getBrand());
        cpu.setModel(request.getModel());
        cpu.setClockspeed(request.getClockspeed());
        cpu.setNumberOfCores(request.getNumberOfCores());
        cpu.setNumberOfThreads(request.getNumberOfThreads());
        cpu.setTdp(request.getTdp());
        cpu.setPriceEur(request.getPriceEur());
        cpu.setSocket(socket);
        return cpuRepository.save(cpu);
    }

    @PutMapping("/{id}")
    public CPU updateCPU(@PathVariable Integer id, @RequestBody CpuRequest request) {
        return cpuRepository.findById(id).map(cpu -> {
            Socket socket = socketRepository.findById(request.getSocketId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid socket ID"));
            cpu.setBrand(request.getBrand());
            cpu.setModel(request.getModel());
            cpu.setClockspeed(request.getClockspeed());
            cpu.setNumberOfCores(request.getNumberOfCores());
            cpu.setNumberOfThreads(request.getNumberOfThreads());
            cpu.setTdp(request.getTdp());
            cpu.setPriceEur(request.getPriceEur());
            cpu.setSocket(socket);
            return cpuRepository.save(cpu);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CPU not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCPU(@PathVariable Integer id) {
        return cpuRepository.findById(id).map(cpu -> {
            cpuRepository.delete(cpu);
            return ResponseEntity.noContent().<Void>build();
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CPU not found"));
    }
}