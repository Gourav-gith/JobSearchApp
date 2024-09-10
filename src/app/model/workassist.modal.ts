export interface Message {
    "0" ?:           string;
    "1" ?:           string;
    mobile_number ?: string;
    email ?: string;
  }

export interface RecentSearchResponce {
    status?:  number;
    message?: string;
    data?:    string[];
}

export interface PopularJobsResponce {
    status?:  number;
    message?: string;
    data?:    PopularJobs;
}

export interface PopularJobs {
    current_page?:   number;
    data?:           PopularJobs[];
    first_page_url?: string;
    from?:           number;
    last_page?:      number;
    last_page_url?:  string;
    links?:          Link[];
    next_page_url?:  null;
    path?:           string;
    per_page?:       number;
    prev_page_url?:  null;
    to?:             number;
    total?:          number;
}

export interface PopularJobs {
    id?:                            number;
    recruiter_id?:                  number;
    job_title?:                     string;
    slug?:                          string;
    min_experience_id?:             number;
    max_experience_id?:             number;
    ctc_type?:                      number;
    fixed_ctc?:                     null;
    min_ctc?:                       string;
    max_ctc?:                       string;
    primary_responsibility_detail?: PrimaryResponsibilityDetail;
    recruiter_company_detail?:      RecruiterCompanyDetail;
    job_location?:                  JobLocation[];
    min_experience?:                Experience;
    max_experience?:                Experience;
}

export interface JobLocation {
    job_location_id?: number;
    city_name?:       string;
    pivot?:           Pivot;
}

export interface Pivot {
    job_basic_detail_id?: number;
    job_location_id?:     number;
}

export interface Experience {
    id?:  number;
    min?: number;
}

export interface PrimaryResponsibilityDetail {
    job_basic_detail_id?:      number;
    does_reveal_company_name?: number;
    display_company_name?:     string;
}

export interface RecruiterCompanyDetail {
    id?:           number;
    company_logo?: string;
}

export interface Link {
    url?:    null | string;
    label?:  string;
    active?: boolean;
}

export interface JobsByCatagoriesResponce {
    status?:  number;
    message?: string;
    data?:    JobsByCatagories[];
}

export interface JobsByCatagories {
    industry_id?: number;
    job_count?:   number;
    industry?:    Industry;
}

export interface Industry {
    id?:   number;
    name?: string;
}

export interface JoblistResponse {
    status?:  number;
    message?: string;
    data?:    JobListData;
}

export interface JobListData {
    current_page?:   number;
    data?:           JobList[];
    first_page_url?: string;
    from?:           number;
    last_page?:      number;
    last_page_url?:  string;
    links?:          Link[];
    next_page_url?:  null;
    path?:           string;
    per_page?:       number;
    prev_page_url?:  null;
    to?:             number;
    total?:          number;
}

export interface JobList {
    id?:                            number;
    job_title?:                     string;
    slug?:                          string;
    ctc_type?:                      number;
    fixed_ctc?:                     null;
    min_ctc?:                       string;
    max_ctc?:                       string;
    functional_area_id?:            number;
    min_experience_id?:             number;
    max_experience_id?:             number;
    job_location?:                  JobLocation[];
    preferred_skill?:               FunctionalArea[];
    functional_area?:               FunctionalArea;
    min_experience?:                MinExperience;
    max_experience?:                MaxExperience;
    primary_responsibility_detail?: PrimaryResponsibilityDetail;
}

export interface FunctionalArea {
    id?:   number;
    name?: string;
}

export interface JobLocation {
    id?:        number;
    city_name?: string;
}

export interface MaxExperience {
    id?:  number;
    max?: number;
}

export interface MinExperience {
    id?:  number;
    min?: number;
}

export interface PrimaryResponsibilityDetail {
    id?:                       number;
    job_basic_detail_id?:      number;
    does_reveal_company_name?: number;
    display_company_name?:     string;
    primary_responsibilty?:    string;
    job_description?:          string;
    created_at?:               Date;
    updated_at?:               Date;
    job_type?:                 JobType[];
    preferred_shift?:          PreferredShift[];
    work_place_type?:          WorkPlaceType[];
    preferred_gender?:         PreferredGender[];
}

export interface JobType {
    id?:         number;
    type?:       string;
    name?:       string;
    short_code?: string;
    created_at?: Date;
    updated_at?: Date;
    pivot?:      JobTypePivot;
}

export interface JobTypePivot {
    job_primary_responsibility_detail_id?: number;
    job_type_id?:                          number;
}

export interface PreferredGender {
    id?:         number;
    type?:       string;
    name?:       string;
    short_code?: string;
    created_at?: Date;
    updated_at?: null;
    pivot?:      PreferredGenderPivot;
}

export interface PreferredGenderPivot {
    job_primary_responsibility_detail_id?: number;
    preferred_gender_id?:                  number;
}

export interface PreferredShift {
    id?:         number;
    type?:       string;
    name?:       string;
    short_code?: string;
    created_at?: Date;
    updated_at?: Date;
    pivot?:      PreferredShiftPivot;
}

export interface PreferredShiftPivot {
    job_primary_responsibility_detail_id?: number;
    preferred_shift_id?:                   number;
}

export interface WorkPlaceType {
    id?:         number;
    type?:       string;
    name?:       string;
    short_code?: string;
    created_at?: Date;
    updated_at?: Date;
    pivot?:      WorkPlaceTypePivot;
}

export interface WorkPlaceTypePivot {
    job_primary_responsibility_detail_id?: number;
    work_place_id?:                        number;
}

export interface Link {
    url?:    null | string;
    label?:  string;
    active?: boolean;
}

export interface IndividualBlogResponce {
    status?:  number;
    message?: string;
    data?:    IndividualBlog;
}

export interface IndividualBlog {
    id?:               number;
    blog_title?:       string;
    blog_slug?:        string;
    blog_details?:     string;
    created_at?:       Date;
    view_count?:       number;
    blog_category_id?: number;
    status_id?:        number;
    posted_by_id?:     number;
    meta_title?:       string;
    meta_description?: string;
    blog_tags?:        string;
    updated_at?:       Date;
    blog_category?:    BlogCategory;
    posted_by?:        PostedBy;
    blog_image?:       BlogImage;
}

export interface BlogCategory {
    id?:   number;
    name?: string;
}

export interface BlogImage {
    blog_id?:    number;
    blog_image?: string;
}

export interface PostedBy {
    id?:         number;
    first_name?: string;
    last_name?:  string;
    user_image?: null;
}

export interface BlogListResponce {
    status?:  number;
    message?: string;
    data?:    BlogListData;
}

export interface BlogListData {
    current_page?:   number;
    data?:           BlogList[];
    first_page_url?: string;
    from?:           number;
    last_page?:      number;
    last_page_url?:  string;
    links?:          Link[];
    next_page_url?:  null;
    path?:           string;
    per_page?:       number;
    prev_page_url?:  null;
    to?:             number;
    total?:          number;
}

export interface BlogList {
    id?:               number;
    blog_title?:       string;
    blog_slug?:        string;
    blog_details?:     string;
    created_at?:       Date;
    view_count?:       number;
    blog_category_id?: number;
    status_id?:        number;
    posted_by_id?:     number;
    blog_category?:    BlogCategory;
    posted_by?:        PostedBy;
    blog_image?:       BlogImage;
}

export interface BlogCategory {
    id?:   number;
    name?: string;
}

export interface BlogImage {
    blog_id?:    number;
    blog_image?: string;
}

export interface PostedBy {
    id?:         number;
    first_name?: string;
    last_name?:  string;
    user_image?: null;
}

export interface Link {
    url?:    null | string;
    label?:  string;
    active?: boolean;
}

export interface BlogCatagoriesResponce {
    status?:  number;
    message?: string;
    data?:    BlogCatagories[];
}

export interface BlogCatagories {
    id?:   number;
    name?: string;
}


export interface JobSeekerBasicDetailsResponce {
    status?:  number;
    message?: string;
    data?:    JobSeekerBasicDetails;
}

export interface JobSeekerBasicDetails {
    first_name?:    string;
    middle_name?:   string;
    last_name?:     string;
    email?:         string;
    mobile_number?: string;
    profile_image?: string;
}

export interface JobSeekerCertificationsResponce {
    status?:  number;
    message?: string;
    data?:    JobSeekerCertifications[];
}

export interface JobSeekerCertifications {
    id?:                  number;
    certification_name?:  string;
    issue_by?:            string;
    does_expire?:         number;
    certification_url?:   string;
    issue_month_id?:      number;
    issue_month?:         string;
    issue_year_id?:       number;
    issue_year?:          string;
    expiration_month_id?: string;
    expiration_month?:    string;
    expiration_year_id?:  string;
    expiration_year?:     string;
}

export interface JobSeekerEducationalDetailsResponce {
    status?:  number;
    message?: string;
    data?:    JobSeekerEducationalDetails[];
}

export interface JobSeekerEducationalDetails {
    id?:                    number;
    qualification_id?:      number;
    qualification_name?:    string;
    course_id?:             number;
    course_name?:           string;
    specialization_id?:     number;
    specialization_name?:   string;
    institute_id?:          number;
    institute_name?:        string;
    passing_year_id?:       number | string;
    passing_year?:          string;
    does_current_pursuing?: number;
    board_id?:              string;
    board_name?:            string;
    school_id?:             string;
    school?:                string;
}

export interface JobSeekerPreferredJobsResponce {
    status?:  number;
    message?: string;
    data?:    JobSeekerPreferredJobs;
}

export interface JobSeekerPreferredJobs {
    id?:                 number;
    industry_id?:        number;
    industry_name?:      string;
    job_role?:           string[];
    functional_area_id?: number;
    functional_area?:    string;
    location_id?:        number;
    location?:           string;
    expected_ctc?:       string;
    job_type_id?:        number;
    job_type?:           string;
}

export interface JobSeekerProfessionalDetailsResponce {
    status?:  number;
    message?: string;
    data?:    JobSeekerProfessionalDetails;
}

export interface JobSeekerProfessionalDetails {
    id?:                       number;
    total_work_exp_months_id?: number;
    total_work_exp_months?:    string;
    total_work_exp_years_id?:  number;
    total_work_exp_years?:     string;
    industry_id?:              number;
    industry?:                 string;
    functional_area_id?:       number;
    functional_area?:          string;
    work_level_id?:            number;
    work_level?:               string;
    current_ctc?:              string;
    joining_availability_id?:  number;
    joining_availability?:     string;
    skills?:                   string[];
    work_mode_name? : string;
    job_type ? : string
}

export interface JobSeekerPersonalDetailsResponce {
    status?:  number;
    message?: string;
    data?:    JobSeekerPersonalDetails;
}

export interface JobSeekerPersonalDetails {
    date_of_birth?:           string;
    gender_id?:               number;
    gender_name?:             string;
    marital_status_id?:       string;
    marital_status?:          string;
    nationality_id?:          number;
    nationality?:             string;
    address_line_1?:          string;
    address_line_2?:          string;
    pincode?:                 string;
    city_id?:                 number;
    city_name?:               string;
    state_id?:                number;
    state_name?:              string;
    country_id?:              number;
    country_name?:            string;
    aadhar_number?:           string;
    pan_number?:              string;
    alternate_email?:         string;
    alternate_mobile_number?: string;
    linkedin?:                string;
    languages?:               Language[];
}

export interface Language {
    name?:  string;
    level?: string;
}
export interface JobSeekerSummaryProfileResponce {
    status?:  number;
    message?: string;
    data?:    JobSeekerSummaryProfile;
}

export interface JobSeekerSummaryProfile {
    id?:              number;
    profile_summary?: string;
}

export interface QualificationResponse {
    status?:  number;
    message?: string;
    data?:    Qualification[];
}

export interface Qualification {
    id?:   number;
    type?: string;
    name?: string;
}

export interface CourseResponse {
    status?:  number;
    message?: string;
    data?:    Course[];
}

export interface Course {
    id?:   number;
    type?: CourseType;
    name?: string;
}

export enum CourseType {
    Course = "course",
}

export interface SpecializationResponse {
    status?:  number;
    message?: string;
    data?:    Specialization[];
}

export interface Specialization {
    id?:   number;
    type?: SpecializationType;
    name?: string;
}

export enum SpecializationType {
    Specialization = "specialization"
}

export interface PassingYearsResponse {
    status?:  number;
    message?: string;
    data?:    PassingYears[];
}

export interface PassingYears {
    id?:   number;
    type?: PassingYearsType;
    name?: string;
}

export enum PassingYearsType {
    PassingYears = "passing_years",
}

export interface InstitutesResponse {
    status?:  number;
    message?: null;
    data?:    Institutes[];
}

export interface Institutes {
    id?:   number;
    name?: string;
}

export interface SchoolsResponse {
    status?:  number;
    message?: null;
    data?:    Schools[];
}

export interface Schools {
    id?:   number;
    name?: string;
}

export interface YearsOfExperienceResponse {
    status?:  number;
    message?: string;
    data?:    YearsOfExperience[];
}

export interface YearsOfExperience {
    id?:   number;
    type?: ExperienceType;
    name?: string;
}

export enum ExperienceType {
    Experience = "experience",
}

export interface ResendOTPResponse {
    status?:  number;
    message?: string;
    data?:    ResendOTP;
}

export interface ResendOTP {
    "0"?:           string;
    "1"?:           string;
    mobile_number?: string;
}

export interface GenerateEmailOTPResponse {
    status?:  number;
    message?: string;
    data?:    GenerateEmailOTP;
}

export interface GenerateEmailOTP {
    email?: string;
    type?:  string;
}

export interface VerifyEmailResponse {
    status?:  number;
    message?: string;
    data?:    VerifyEmail;
}

export interface VerifyEmail {
    email?: string;
    type?:  string;
}

export interface UpdateMobileResponse {
    status?:  number;
    message?: string;
    data?:    UpdateMobile;
}

export interface UpdateMobile {
    email?:         string;
    mobile_number?: string;
}







