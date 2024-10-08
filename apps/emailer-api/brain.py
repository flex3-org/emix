import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])


def get_response(file_content, user_input):
    # Create the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        # safety_settings = Adjust safety settings
        # See https://ai.google.dev/gemini-api/docs/safety-settings
        system_instruction=
        "You are professional HTML email Generator. You follow the rules given below to create attractive emails and give them in HTML/CSS format.\nSophisticated Color Palette: Use black, deep navy, or charcoal backgrounds with gold or silver accents for a refined look.\nElegant Typography: Pair serif fonts (e.g., Georgia) for headings with sans-serif (e.g., Helvetica) for body text, ensuring legibility.\nGenerous White Space: Include ample padding and margins for a clean, luxurious feel.\nMinimalist Layout: Opt for 2-3 key sections with subtle dividers to keep the design simple.\nHigh-Quality Imagery: Use full-width, responsive images showcasing exclusivity.\nLuxurious CTAs: Style button with metallic backgrounds, refined borders, and simple text like \"Discover More.\"\nAttention to Detail: Include subtle hover effects, refined line spacing, and icons to enhance the premium design.\nBrand Consistency: Align the logo and design with the brand's identity for a cohesive look.\nMobile Optimization: Ensure responsiveness across devices with fluid layouts, mobile meta tags, and accessible CTAs.\nAccessibility: Add ARIA roles, use alt text, ensure color contrast, and avoid image-heavy designs for better compatibility.",
    )

    chat_session = model.start_chat(history=[
        {
            "role":
            "model",
            "parts": [
                "```html\n<mjml>\n  <mj-body background-color=\"#F4F4F4\" color=\"#55575d\" font-family=\"Arial, sans-serif\">\n    <mj-section background-color=\"#ffffff\" background-repeat=\"repeat\" padding-bottom=\"0px\" padding-top=\"30px\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-image align=\"center\" padding=\"10px 25px\" src=\"http://5vph.mj.am/img/5vph/b/1g8pi/0gztq.png\" target=\"_blank\" width=\"214px\"></mj-image>\n        <mj-text align=\"left\" color=\"#55575d\" font-family=\"Arial, sans-serif\" font-size=\"13px\" line-height=\"22px\" padding-bottom=\"15px\" padding-top=\"0px\" padding=\"10px 25px\">\n          <p style=\"text-align: center; margin: 10px 0;color:#151e23;font-size:14px;font-family:Georgia,Helvetica,Arial,sans-serif\">Product | Concept | Contact</p>\n        </mj-text>\n      </mj-column>\n    </mj-section>\n    <mj-section background-repeat=\"repeat\" padding-bottom=\"0px\" padding-top=\"0px\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-image align=\"center\" padding-bottom=\"0px\" padding-left=\"0px\" padding-right=\"0px\" padding-top=\"0px\" padding=\"10px 25px\" src=\"https://placehold.co/600x200/222/ffffff/&text=Your+Banner+Image+Here\" target=\"_blank\" width=\"600px\"></mj-image>\n      </mj-column>\n    </mj-section>\n    <mj-section background-color=\"#ffffff\" background-repeat=\"repeat\" background-size=\"auto\" padding-bottom=\"0px\" padding-top=\"30px\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-text align=\"left\" color=\"#55575d\" font-family=\"Arial, sans-serif\" font-size=\"30px\" line-height=\"22px\" padding-bottom=\"10px\" padding-top=\"10px\" padding=\"10px 25px\">\n          <p style=\"line-height: 30px; margin: 10px 0; text-align: center; color:#151e23; font-size:30p; font-family:Georgia,Helvetica,Arial,sans-serif\">30% Off Everything - September 10th Only!</p>\n        </mj-text>\n      </mj-column>\n    </mj-section>\n    <mj-section background-color=\"#ffffff\" background-repeat=\"repeat\" padding-bottom=\"0px\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-text align=\"left\" color=\"#55575d\" font-family=\"Arial, sans-serif\" font-size=\"13px\" line-height=\"22px\" padding-bottom=\"0px\" padding-left=\"40px\" padding-right=\"40px\" padding-top=\"0px\" padding=\"10px 25px\">\n          <p style=\"margin: 10px 0; color:#151e23; font-size:16px; font-family:Georgia,Helvetica,Arial,sans-serif\">Dress your best for less! For one day only, enjoy 30% off our entire collection of stylish clothing.</p>\n        </mj-text>\n      </mj-column>\n    </mj-section>\n    <mj-section background-color=\"#ffffff\" background-repeat=\"repeat\" direction=\"rtl\" padding-bottom=\"0px\" padding-top=\"0px\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-text align=\"left\" color=\"#55575d\" font-family=\"Arial, sans-serif\" font-size=\"13px\" line-height=\"22px\" padding-bottom=\"0px\" padding-left=\"40px\" padding-right=\"40px\" padding-top=\"0px\" padding=\"10px 25px\">\n          <p style=\"margin: 10px 0; color:#151e23; font-size:16px; font-family:Georgia,Helvetica,Arial,sans-serif\"><b>Shop our curated selection of:</b></p>\n          <ul style=\"margin: 10px 0; color:#354552; font-size:14px; font-family:Georgia,Helvetica,Arial,sans-serif;\">\n            <li>Elegant Dresses: From flowy maxi dresses to sleek cocktail dresses, find the perfect piece for any occasion.</li>\n            <li>Stylish Tops: Explore a wide range of blouses, tees, tanks, and sweaters in classic and trendy styles.</li>\n            <li>Statement Pants: Elevate your look with stylish jeans, tailored trousers, and comfy leggings.</li>\n            <li>Feminine Skirts: Embrace feminine flair with A-line, midi, and pencil skirts in a variety of fabrics and prints.</li>\n            <li>Chic Jackets & Coats: Stay warm and fashionable with our selection of jackets and coats, perfect for the changing seasons.</li>\n          </ul>\n        </mj-text>\n      </mj-column>\n    </mj-section>\n    <mj-section background-color=\"#ffffff\" background-repeat=\"repeat\" padding-top=\"0px\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-button align=\"center\" background-color=\"#354552\" border-radius=\"3px\" color=\"#ffffff\" font-family=\"Georgia, Helvetica, Arial, sans-serif\" font-size=\"14px\" font-weight=\"normal\" inner-padding=\"10px 25px\" padding=\"10px 25px\" text-decoration=\"none\" text-transform=\"none\" vertical-align=\"middle\">Shop Now!</mj-button>\n      </mj-column>\n    </mj-section>\n    <mj-section background-color=\"#ffffff\" background-repeat=\"repeat\" padding-bottom=\"0px\" padding-top=\"0px\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-image align=\"center\" padding-bottom=\"0px\" padding-left=\"0px\" padding-right=\"0px\" padding-top=\"0px\" padding=\"10px 25px\" src=\"https://placehold.co/600x200/222/ffffff/&text=Your+Image+Here\" target=\"_blank\" width=\"600px\"></mj-image>\n      </mj-column>\n    </mj-section>\n    <mj-section background-color=\"#ffffff\" background-repeat=\"repeat\" padding=\"20px 0\" text-align=\"center\" vertical-align=\"top\">\n      <mj-column>\n        <mj-image align=\"center\" padding=\"10px 25px\" src=\"http://5vph.mj.am/img/5vph/b/1g8pi/0gzjm.png\" target=\"_blank\" width=\"202px\"></mj-image>\n        <mj-social align=\"center\">\n          <mj-social-element name=\"facebook\"></mj-social-element>\n          <mj-social-element name=\"pinterest\"></mj-social-element>\n          <mj-social-element name=\"instagram\"></mj-social-element>\n        </mj-social>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>\n```",
            ],
        },
    ])

    # user_input = input("Enter the description of the email you want: ")

    prompt = f"{file_content} Edit the given MJML template for the following usecase: {user_input}"

    response = chat_session.send_message(prompt)
    return response.text
