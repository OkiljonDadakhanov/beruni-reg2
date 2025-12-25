import type { FormValues } from "./form-schema";

export interface Country {
  id: number;
  name: string;
}

// Fetch countries from the API via Next.js API route (to avoid CORS issues)
export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch("/api/countries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error ||
        `Failed to fetch countries: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // The API route already handles response structure, so we should get an array
    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn("Unexpected response structure from API route:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    // Re-throw to allow component to handle the error
    throw error;
  }
}
// Submit registration form via Next.js API route (to avoid CORS issues)
export async function submitRegistration(formData: FormData): Promise<unknown> {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary for FormData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error ||
        `Failed to submit registration: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting registration:", error);
    throw error;
  }
}

// Helper function to prepare form data for API submission
export function prepareFormData(values: FormValues): FormData {
  const formData = new FormData();

  // Add basic registration data
  formData.append("country", values.country);
  formData.append("official_delegation_name", values.official_delegation_name);
  formData.append(
    "total_accompanying_persons",
    values.total_accompanying_persons
  );
  formData.append("confirm_information", values.confirm_information.toString());
  formData.append("agree_rules", values.agree_rules.toString());

  // Add team leaders
  values.team_leaders.forEach((leader, index) => {
    formData.append(`team_leaders[${index}][full_name]`, leader.full_name);
    formData.append(`team_leaders[${index}][email]`, leader.email);
    formData.append(
      `team_leaders[${index}][phone_number]`,
      leader.phone_number
    );

    if (leader.passport_scan instanceof File && leader.passport_scan.size > 0) {
      formData.append(
        `team_leaders[${index}][passport_scan]`,
        leader.passport_scan
      );
    }

    if (leader.id_photo instanceof File && leader.id_photo.size > 0) {
      formData.append(`team_leaders[${index}][id_photo]`, leader.id_photo);
    }
  });

  // Add contestants
  values.contestants.forEach((contestant, index) => {
    formData.append(`contestants[${index}][full_name]`, contestant.full_name);

    if (contestant.date_of_birth) {
      formData.append(
        `contestants[${index}][date_of_birth]`,
        contestant.date_of_birth.toISOString().split("T")[0]
      );
    }

    formData.append(`contestants[${index}][gender]`, contestant.gender);
   
    formData.append(
      `contestants[${index}][passport_number]`,
      contestant.passport_number
    );

    if (contestant.passport_expiry_date) {
      formData.append(
        `contestants[${index}][passport_expiry_date]`,
        contestant.passport_expiry_date.toISOString().split("T")[0]
      );
    }

    formData.append(
      `contestants[${index}][t_shirt_size]`,
      contestant.t_shirt_size
    );

    if (contestant.special_requirements) {
      formData.append(
        `contestants[${index}][special_requirements]`,
        contestant.special_requirements
      );
    }

    if (contestant.passport_scan instanceof File && contestant.passport_scan.size > 0) {
      formData.append(
        `contestants[${index}][passport_scan]`,
        contestant.passport_scan
      );
    }

    if (contestant.id_photo instanceof File && contestant.id_photo.size > 0) {
      formData.append(`contestants[${index}][id_photo]`, contestant.id_photo);
    }

    if (contestant.parental_consent_form instanceof File && contestant.parental_consent_form.size > 0) {
      formData.append(
        `contestants[${index}][parental_consent_form]`,
        contestant.parental_consent_form
      );
    }
  });

  return formData;
}
