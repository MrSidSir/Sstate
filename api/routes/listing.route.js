import express from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings
} from '../controllers/listing.controller.js';

const router = express.Router();

// ✅ Create listing
router.post('/create', createListing);

// ✅ Get all listings
router.get('/', getListings);

// ✅ Get a single listing
router.get('/:id', getListing);

// ✅ Update listing
router.put('/:id', updateListing);

// ✅ Delete listing
router.delete('/:id', deleteListing);

export default router;
