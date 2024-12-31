import express from "express";
import FormResponse from "../../schema/form-response.schema.js"
import Form from "../../schema/form.schema.js"

const router = express.Router();

router.post('/submit-form', async (req, res) => {
    const { formId, responses } = req.body;

    try {
        const newResponse = new FormResponse({
            formId,
            responses,
            submissionDate: new Date(),
        });
        await newResponse.save();

        res.status(201).send('Form submitted successfully');
    } catch (error) {
        res.status(500).send('Error saving form response');
    }
});

router.get('/:formId', async (req, res) => {
    const { formId } = req.params;

    try {
        const responses = await FormResponse.find({ formId });
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).send('Error fetching form responses');
    }
});





export default router;
