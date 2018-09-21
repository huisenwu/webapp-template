import express from "express";

const router = express.Router();

router.get("/courses", (req, res) => {
    res.json([
        {name: "Java", description: "A Java course"},
        {name: "React", description: "A React course"},
        {name: "TIBCO", description: "A TIBCO course"}
    ]);
});

export default router;
