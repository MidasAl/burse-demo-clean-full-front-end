# Welcome to your Lovable project

## Overview
This platform enables administrators to manage groups and reimbursements, while allowing users to join groups and submit reimbursement requests. The system currently uses dummy data for frontend testing purposes.

### User Types
- **Administrators**: Can create groups, generate invite codes, and manage reimbursements
- **Users**: Can join groups using invite codes and submit reimbursement requests

## Features

### Admin Features
- **Group Management**: Create and manage groups
- **Invite Code Generation**: Generate unique codes for group invitations
- **Reimbursement Management**: Process and approve reimbursement requests
- **Analytics Dashboard**: View group activity and reimbursement statistics

### User Features
- **Group Joining**: Join groups using invite codes
- **Reimbursement Submission**: Submit requests with the following steps:
  1. Select reimbursement type (Uber, Hotel, Flight, Food)
  2. Upload receipt and enter details
  3. View submission status and decision

## User Flows

### Admin Flow
1. Access the admin dashboard
2. Generate an invite code for a new group
3. Share the code with intended group members
4. Monitor and process reimbursement requests

### User Flow
1. Navigate to "Your Groups" screen
2. Click "Join a Group" and enter invite code
3. Access group details after successful join
4. Submit reimbursement requests through the group interface

## Testing with Dummy Data

### Available Test Invite Codes
```
GROUP123 -> Duke Finance
DUKE2024 -> NYU Admin Group
NYU567   -> Venture Capital Team
```

### Testing Steps
1. Use any of the above codes in the "Join a Group" modal
2. Observe the group details display
3. Test the reimbursement flow by clicking "Submit Reimbursements"

## Project Structure

```plaintext
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardView.tsx
│   │   └── InviteCodeCard.tsx
│   ├── groups/
│   │   ├── GroupCard.tsx
│   │   ├── GroupsView.tsx
│   │   ├── JoinGroupModal.tsx
│   │   └── types.ts
│   ├── reimbursements/
│   │   ├── ReimbursementFlow.tsx
│   │   └── types.ts
│   └── Sidebar.tsx
├── pages/
│   ├── Index.tsx
│   ├── Landing.tsx
│   ├── Register.tsx
│   ├── SignIn.tsx
│   └── UserDashboard.tsx
└── App.tsx
```

## Technical Details

### Frontend Stack
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Router for navigation
- Tanstack Query for data management

### Key Components
- **GroupsView**: Main interface for users to join and view groups
- **ReimbursementFlow**: Multi-step form for submitting reimbursements
- **DashboardView**: Admin interface for managing groups and codes

## Local Development

### Prerequisites
- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup Instructions
```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

## Deployment

You can deploy this project in two ways:
1. Using Lovable: Open [Lovable](https://lovable.dev/projects/c797b115-209a-425d-ba32-0ed39092e043) and click on Share -> Publish
2. Custom Domain: Deploy to Netlify following our [custom domain guide](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Future Development

### Planned Features
- Backend integration for real invite code validation
- Email notifications for reimbursement status updates
- Advanced analytics for administrators
- Multi-currency support for international reimbursements

## Support

For questions or issues:
- Visit our [documentation](https://docs.lovable.dev/)
- Join our [Discord community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Watch our [tutorial videos](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)