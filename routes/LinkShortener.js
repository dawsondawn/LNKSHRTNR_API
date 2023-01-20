import express from 'express'
import { getLink, getAllLinks, insertLink } from '../services/dynamodb'

const router = express.Router()

// GET link WITH with shortenedLink
router.get('/LinkShortener/:link', async (req, res) => {
    const shortenedLink = req.params.link
    const { success, data } = await getLink(shortenedLink)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// GET all links
router.get('/LinkShortener', async (req, res) => {
  const { success, data } = await getAllLinks()
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// Insert New Link
router.post('/LinkShortener', async (req, res) => {
  const { success, data } = await insertLink(req.body)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

export default router
