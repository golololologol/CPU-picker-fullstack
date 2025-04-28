package Nubedian.project.CPU_picker;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sockets")
public class SocketController {

    @Autowired
    private SocketRepository socketRepository;

    @GetMapping
    public List<Socket> getAllSockets() {
        return socketRepository.findAll();
    }
}