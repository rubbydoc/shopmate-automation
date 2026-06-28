import { Page, Locator, expect } from '@playwright/test';
import { NAV_OPTIONS } from '../utils/constants';

export class ContactUsPage {
    readonly page: Page;

    // --- Locators ---
    // Page heading
    readonly pageHeading: Locator;
    readonly getInTouchHeading: Locator;

    // Form fields
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly fileUploadInput: Locator;
    readonly submitButton: Locator;

    // Post-submission
    readonly successMessage: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageHeading = page.getByRole('heading', { name: 'Contact Us' });
        this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch' });

        // Form fields — scoped inside the contact form container
        const contactForm = page.locator('.contact-form');
        this.nameInput = contactForm.getByPlaceholder('Name');
        this.emailInput = contactForm.getByPlaceholder('Email');
        this.subjectInput = contactForm.getByPlaceholder('Subject');
        this.messageInput = contactForm.getByPlaceholder('Your Message Here');
        this.fileUploadInput = contactForm.locator('input[type="file"]');
        this.submitButton = contactForm.getByRole('button', { name: 'Submit' });

        // Success state
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
        this.homeButton = page.getByRole('link', { name: 'Home' }).first();
    }

    // --- Actions ---

    async navigate() {
        await this.page.goto('/contact_us', NAV_OPTIONS);
    }

    async assertPageVisible() {
        await expect(this.pageHeading).toBeVisible();
        await expect(this.getInTouchHeading).toBeVisible();
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillSubject(subject: string) {
        await this.subjectInput.fill(subject);
    }

    async fillMessage(message: string) {
        await this.messageInput.fill(message);
    }

    async uploadFile(filePath: string) {
        await this.fileUploadInput.setInputFiles(filePath);
    }

    async submitForm() {
        // This site shows a browser dialog on submit — handle it automatically
        this.page.on('dialog', dialog => dialog.accept());
        await this.submitButton.click();
    }

    async fillAndSubmit(data: {
        name: string;
        email: string;
        subject: string;
        message: string;
        filePath?: string;
    }) {
        await this.fillName(data.name);
        await this.fillEmail(data.email);
        await this.fillSubject(data.subject);
        await this.fillMessage(data.message);
        if (data.filePath) {
            await this.uploadFile(data.filePath);
        }
        await this.submitForm();
    }

    async assertSubmissionSuccess() {
        await expect(this.successMessage).toBeVisible({ timeout: 15000 });
    }

    async assertStillOnForm() {
        await expect(this.getInTouchHeading).toBeVisible();
        // Check scoped locator — form success message should not be visible
        await expect(
            this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')
        ).not.toBeVisible();
    }

    async navigateHomeAfterSubmission() {
        await this.homeButton.click();
        await expect(this.page).toHaveURL('/');
    }
}