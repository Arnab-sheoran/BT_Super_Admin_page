import { ObjectId } from 'mongodb'
import mongoose, { Model, Mongoose, Schema } from 'mongoose'

export class BlogSiteModel {
  siteSchema: any
  siteModel: any
  static siteModel: any

  constructor(mongoose: Mongoose) {
    mongoose = mongoose

    this.siteSchema = new mongoose.Schema(
      {
        _id: {
          type: ObjectId,
          required: true,
        },
        sitename: {
          type: String,
          required: true,
        },
        site_url: {
          type: String,
          required: true,
          unique: true,
        },
        sitetype: {
          type: String,
          required: true,
        },
        homepage_url: {
          type: String,
          required: true,
        },
        about_url: {
          type: String,
          required: true,
        },
        // email: {
        //     type: String,
        //     required: true,
        // },
        // first_name: {
        //     type: String,
        //     required: true
        // },
        // last_name: {
        //     type: String,
        //     required: false
        // },
        user_id: {
          type: String,
          required: true,
        },
        wordpress_username: {
          type: String,
          required: false,
        },
        wordpress_password: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          values: ['Active', 'InActive'],
          default: 'Active',
          required: true,
        },
        process_status: {
          type: String,
          values: [
            'TBD',
            'Initiated',
            'InProgress',
            'Blocked',
            'Error',
            'Completed',
          ],
          default: 'TBD',
          required: true,
        },
        numberofPosts: {
          type: Number,
          default: 0,
          required: true,
        },
        posts_processed: {
          type: Number,
          default: 0,
        },
        post_API_url: {
          type: String,
          required: true,
        },
        ga_property_id: {
          type: String,
        },
        site_features: {
          chatbot: {
            type: Boolean,
            default: false,
          },
          instagram: {
            type: Boolean,
            default: false,
          },
          newsletter: {
            type: Boolean,
            default: false,
          },
        },

        email_notifications: {
          type: Boolean,
          default: true,
        },

        security_alerts: {
          type: Boolean,
          default: true,
        },

        firstSubscriptionActivated: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true },
    )

    this.siteModel =
      mongoose.models.Site || mongoose.model('Site', this.siteSchema)
  }
}
