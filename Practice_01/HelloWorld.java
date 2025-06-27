import org.apache.log4j.Logger;

public class HelloWorld {

        static Logger log = Logger.getLogger(HelloWorld.class);
        public static void main(String[] args) {
            log.debug("Hello this is an debug message");
            log.info("Hello this is an info message");
        }

}