export interface CompanydetailsResponse {
    status?:  number;
    message?: string;
    data?:    Companydetail;
}

export interface Companydetail {
    company_name?:          string;
    company_logo?:          string;
    website_url?:           string;
    email?:                 string;
    address_line_1?:        string;
    address_line_2?:        null;
    pincode?:               string;
    city_id?:               string;
    city_name?:             string;
    state_id?:              string;
    state_name?:            string;
    country_id?:            string;
    country_name?:          string;
    pan_number?:            string;
    pan_document?:          string;
    gst_number?:            string;
    gst_document?:          string;
    company_type_id?:       string;
    company_type_name?:     string;
    cin_number?:            string;
    year_of_establishment?: string;
    company_size?:          string;
    linkedin_url?:          string;
    about_company?:         string;
    industry_serves?:       IndustryServe[];
}

export interface IndustryServe {
    id?:   string;
    name?: string;
}


export interface ProfessionalDetailsResponse {
    status?:  number;
    message?: string;
    data?:    ProfessionalDetails;
}

export interface ProfessionalDetails {
    first_name?:      string;
    middle_name?:     string;
    last_name?:       string;
    email?:           string;
    mobile_number?:   string;
    job_role?:        string;
    company_name?:     string;
    address_line_1?:  string;
    address_line_2?:  string;
    pincode?:         string;
    city_id?:         string;
    city_name?:       string;
    state_id?:        string;
    state_name?:      string;
    country_id?:      string;
    country_name?:    string;
    profile_summary?: string;
    profile_image?:   string;
}

export interface CompanyDetailsupdateResponse {
    status?:  number;
    message?: string;
    data?:    CompanyDetailsUpdate;
}

export interface CompanyDetailsUpdate {
    company_name?:          string;
    company_logo?:          string;
    website_url?:           string;
    email?:                 string;
    address_line_1?:        string;
    address_line_2?:        null;
    pincode?:               string;
    city_name?:             string;
    state_name?:            string;
    country_name?:          string;
    pan_number?:            null;
    pan_document?:          string;
    gst_number?:            string;
    gst_document?:          string;
    company_type_name?:     string;
    cin_number?:            string;
    year_of_establishment?: null;
    company_size?:          number;
    linkedin_url?:          string;
    about_company?:         string;
}

export interface AboutCompanyResponse {
    status?:  number;
    message?: string;
    data?:    AboutCompany;
}

export interface AboutCompany {
    about_company?: string;
}



