import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.['role'] === 'admin',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2024 My Site. All rights reserved.',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'newTab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name or SVG (for custom platforms)',
          },
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Signup',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Stay Updated',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'actionUrl',
          type: 'text',
          admin: {
            description: 'Form action URL (e.g., Mailchimp, ConvertKit endpoint)',
          },
        },
      ],
    },
  ],
}