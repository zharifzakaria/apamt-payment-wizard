# APAMT Payment Wizard

This project is a payment wizard for the Asia Pacific Association of Medical Toxicology (APAMT) conference. It allows participants to register and pay for the conference online.

## Tech Stack

- Vue 3
- Vite
- Supabase
- Tailwind CSS

## Design Philosophy

The technology stack for this project was carefully selected to prioritize a seamless user experience, development efficiency, and long-term maintainability.

-   **Vue 3 & Vite:** Vue 3's reactive, component-based architecture is exceptionally well-suited for building interactive, stateful applications like a multi-step payment wizard. It simplifies the management of user input and UI updates. Vite complements this by providing a lightning-fast development environment with near-instant hot-reloading, which significantly accelerates the process of building and debugging features.

-   **Supabase:** As a Backend-as-a-Service (BaaS), Supabase was a strategic choice to handle data persistence and authentication without the complexity of building and managing a dedicated backend. This allows the project to focus on its core purpose—the user-facing payment flow—while relying on a scalable and secure PostgreSQL database.

-   **Tailwind CSS:** A utility-first CSS framework like Tailwind was chosen to facilitate rapid UI development and ensure design consistency. It allows for building a polished, custom interface directly within the markup, which streamlines the creation of responsive and maintainable components.

## Future Implementation

I plan to continue developing this project by adding the following features:

- **Admin Dashboard:** A dashboard for managing participants and payments.
- **Email Notifications:** Automated email notifications for registration and payment confirmation.
- **Stripe Integration:** Integration with Stripe for more payment options.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file and add your Supabase credentials (see `.env.example`)
4. Run the development server: `npm run dev`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
