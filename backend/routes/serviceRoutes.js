const express = require('express')
const router = express.Router()
const {
  getServices,
  getService,
  createService,
  updateService
} = require('../controllers/serviceController')

// Public routes
router.get('/', getServices)
router.get('/:platform/:service', getService)

// Admin routes
router.post('/', createService)
router.put('/:id', updateService)

module.exports = router
