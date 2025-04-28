package Nubedian.project.CPU_picker;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CpuPickerApplicationTests {

    @Autowired
    private DataSource dataSource;

    @Test
    void testDataSourceConnection() throws SQLException {
        assertNotNull(dataSource, "DataSource should be configured");
        try (Connection conn = dataSource.getConnection()) {
            assertTrue(conn.isValid(2), "Connection should be valid");
        }
    }
}