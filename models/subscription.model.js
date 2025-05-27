import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minlength: [2, 'Subscription name must be at least 3 characters long'],
    maxlength: [50, 'Subscription name must be at most 50 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    min: [0, 'Subscription price must be greater than 0'],
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'UAH'],
    default: 'USD',
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    default: 'monthly',
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active',
  },
  category: {
    type: String,
    enum: ['food', 'entertainment', 'health', 'education', "sport", "finance", 'other'],
    default: 'other',
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'bank_transfer', 'cash', 'other'],
    default: 'card',
  },
  startDate: {
    type: Date,
    required: [true, 'Subscription start date is required'],
    validate: {
      validator:  (value) => value < new Date(),
      message: 'Start date must be in the past',
    },
  },
  renewalDate: {
    type: Date,
    validate: {
      validator:  function (value) {
        return value > this.startDate;
      },
      message: 'Renewal date must be after start date',
    },
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes must be less than 500 characters'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true,
  }
}, { timestamps: true });

subscriptionSchema.pre("save", async function (next) {
  if(!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const renewalPeriod = renewalPeriods[this.frequency];
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod);
  }


  if(this.renewalDate && this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;