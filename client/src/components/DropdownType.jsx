import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

const SpaceTypeDropDown = ({ setSelectedSpaceType }) => {
    const [open, setOpen] = useState(false);
    const [selectedSpaceType, setSelectedSpaceTypeState] = useState("Select a Space Type");

    const spaceTypes = [
        "Working Space",
        "Personal Space",
        "Meeting Room",
        "Shared Office",
        "Private Floor Office"
    ];

    return (
        <div className="relative flex items-center justify-center bg-white">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex items-center w-[300px] sm:w-48 h-12 py-3 px-5 rounded-md text-white bg-[#191B1D] transform transition-transform duration-300 hover:scale-105 relative"
                >
                    <span className="font-medium text-sm truncate">{selectedSpaceType}</span>
                    <motion.span 
                        variants={iconVariants}
                        className="absolute right-3"
                    >
                        <FiChevronDown />
                    </motion.span>
                </button>

                {/* Dropdown Menu */}
                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    className={`absolute top-full left-0 mt-2 
                        w-[300px] sm:w-48 p-2 bg-[#191B1D] rounded-lg shadow-xl z-10`}
                >
                    {spaceTypes.map((spaceType, index) => (
                        <Option 
                            key={index} 
                            setOpen={setOpen} 
                            text={spaceType} 
                            setSelectedSpaceType={setSelectedSpaceTypeState} 
                            setParentSelectedSpaceType={setSelectedSpaceType} 
                        />
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({ text, setOpen, setSelectedSpaceType, setParentSelectedSpaceType }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => {
                setSelectedSpaceType(text);
                setParentSelectedSpaceType(text);
                setOpen(false);
            }}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md text-white hover:bg-gray-800 transition-colors cursor-pointer"
        >
            <span>{text}</span>
        </motion.li>
    );
};

export default SpaceTypeDropDown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        originY: "top",
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        originY: "top",
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};
