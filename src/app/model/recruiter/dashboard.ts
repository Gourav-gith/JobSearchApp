export interface RequiterDashboardResponse {
    status?:  number;
    message?: string;
    data?:    RequiterDashboard;
}

export interface RequiterDashboard {
    active_jobs?:            number;
    applied_candidates?:     number;
    shortlisted_candidates?: number;
    on_hold_candidates?:     number;
}


export interface RecentJobPostResponse {
    status?:  number;
    message?: string;
    data?:    RecentPost[];
}

export interface RecentPost {
    id?:                    number;
    job_title?:             string;
    job_locations?:         string;
    posted_date?:           string;
    application_count?:     number;
    new_application_count?: number;
}

export interface RecentApplicationResponse {
    status?:  number;
    message?: string;
    data?:    recentApplication[];
}

export interface recentApplication {
    id?:            number;
    job_id?:        number;
    first_name?:    string;
    middle_name?:   string;
    last_name?:     string;
    profile_image?: string;
    job_title?:     string;
}

export interface RecentBlogResponse {
    status?:  number;
    message?: string;
    data?:    RecentBlog[];
}

export interface RecentBlog {
    id?:               number;
    blog_title?:       string;
    blog_slug?:        string;
    blog_details?:     string;
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
    user_image?: UserImage;
}

export interface UserImage {
    id?:         number;
    user_id?:    number;
    user_image?: string;
}


