package Nubedian.project.CPU_picker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CPURepository extends JpaRepository<CPU, Integer> {
}