import ToggleTheme from "../components/ToggleTheme";

    function Terms() {

    return (
        <div className="min-h-screen dark:bg-[#1c1c1c] dark:text-white flex flex-col font-[Google_Sans_Flex] items-center justify-center items-center p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-center">
            Lectra Terms & Conditions
        </h1>
        <p className="mb-6 max-w-2xl">
            Welcome to Lectra. By using this platform, whether as an admin or a
            registered user, you acknowledge and agree to the following terms:
        </p>

        <div className="mb-4 max-w-2xl space-y-5">
            <p>
            <span className="text-2xl font-[600]">1. Ownership and Control:</span> <br /> Lectra is fully owned and
            operated by Ryoichi. Ryoichi retains total control over all content,
            features, and user activity. Access, uploads, or edits may be modified
            or removed at any time without prior notice.
            </p>

            <p>
            <span className="text-2xl font-[600]">2. Platform Purpose:</span> <br /> Lectra is solely intended for
            uploading lectures, assignments, and tracking textbook prices for coursemates. Any
            use outside this scope is not supported or authorized.
            </p>

            <p>
            <span className="text-2xl font-[600]">3. User Responsibilities:</span> <br /> All users agree to follow
            Ryoichi's rules and guidelines. Attempts to bypass restrictions, modify
            content unauthorizedly, or interfere with the platform are prohibited.
            </p>

            <p>
            <span className="text-2xl font-[600]">4. Third-Party Disclaimer:</span> <br /> Lectra is not subject to
            the jurisdiction of any school authority or external entity. Ryoichi's 
            rules govern the platform, and any external claims do not override
            them.
            </p>

            <p>
            <span className="text-2xl font-[600]">5. Liability:</span> <br /> Lectra is provided “as-is.” Ryoichi is
            not responsible for any consequences arising from use of the platform,
            including academic or disciplinary actions. Users proceed at their own
            risk.
            </p>
            <p>
            <span className="text-2xl font-[600]">5. Contact:</span> <br /> If you have questions about these Terms, stop using the service.
            </p>
        </div>
            <ToggleTheme />
        </div>
    );
    }

    export default Terms;
