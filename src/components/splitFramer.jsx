import { motion } from "framer-motion";

const AnimatedText = ({ text }) => {
    const createSpansFromText = (text) => {
        // Menggunakan DOMParser untuk mengubah HTML ke elemen DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const textNodes = doc.body.childNodes;

        return Array.from(textNodes).map((node, index) => {
            // Jika node adalah teks, kita pisahkan menjadi huruf
            if (node.nodeType === Node.TEXT_NODE) {
                return Array.from(node.textContent).map((letter, i) => (
                    <motion.span
                        key={index + i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + i) * 0.05, duration: 0.3 }}
                    >
                        {letter}
                    </motion.span>
                ));
            }

            // Jika node bukan teks (misalnya tag HTML), render langsung
            return (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                    {node.outerHTML}
                </motion.span>
            );
        });
    };

    return (
        <div>
            {createSpansFromText(text)}
        </div>
    );
};

export default AnimatedText;
