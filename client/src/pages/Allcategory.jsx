import { useState } from "react";
import { Link } from "react-router-dom";
import tablet from "../images/tablet.png";
import audio from "../images/audio1.png";
import mobile from "../images/oqqxIRPr87eTo2e9.png";
import charger from "../images/charger3.png";

const Allcategory = () => {
    const [hovered, setHovered] = useState(null); // Track hover state

    const categories = [
        { img: tablet, name: "Tablet", path: "/tablet" },
        { img: audio, name: "Audio", path: "/audio" },
        { img: mobile, name: "Mobile", path: "/mobile" },
        { img: charger, name: "Charger", path: "/charger" }
    ];

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "space-evenly", 
            gap: "20px", 
            flexWrap: "wrap", 
            padding: "20px" 
        }}>
            {categories.map((category, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                    <Link 
                        to={category.path} 
                        style={{ textDecoration: "none", color: "black" }}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img 
                            src={category.img} 
                            alt={category.name} 
                            style={{ 
                                width: "150px", 
                                height: "auto", 
                                borderRadius: "10px", 
                                display: "block", 
                                margin: "0 auto" 
                            }} 
                        />
                        <div style={{ 
                            marginTop: "10px", 
                            fontSize: "16px", 
                            fontWeight: "bold",
                            textAlign: "center",
                            textDecoration: hovered === index ? "underline" : "none",
                            transition: "text-decoration 0.3s ease"
                        }}>
                            {category.name}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Allcategory;
