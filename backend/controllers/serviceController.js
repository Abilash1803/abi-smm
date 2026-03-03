const Service = require('../models/Service')

// Get all services
const getServices = async (req, res) => {
  try {
    const { platform } = req.query
    
    const filter = platform ? { platform, isActive: true } : { isActive: true }
    const services = await Service.find(filter)

    res.json({
      success: true,
      count: services.length,
      data: services
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get service by platform and service type
const getService = async (req, res) => {
  try {
    const { platform, service } = req.params

    const serviceData = await Service.findOne({ platform, service, isActive: true })

    if (!serviceData) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }

    res.json({
      success: true,
      data: serviceData
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Create service (admin)
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body)

    res.status(201).json({
      success: true,
      data: service
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Update service (admin)
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }

    res.json({
      success: true,
      data: service
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  getServices,
  getService,
  createService,
  updateService
}
