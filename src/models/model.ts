export interface IRegister {
    nama_warga: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IUpdateProfile {
    nama_warga?: string;
    email?: string;
    notelpon?: string;
    nik?: string;
    ttl?: string;
    jenis_kelamin?: string;
    pekerjaan?: string;
    agama?: string;
    alamat?: string;
}

export interface IUpdatePassword {
    password: string;
    confirm_password: string;
}

export interface IUser extends IUpdateProfile {
    id_warga: string,
    access_token: string,
}

export interface IModalError {
    isVisible: boolean;
    description: string;
}

export interface IModalSuccess {
    isVisible: boolean;
    description: string;
}

export interface IModalConfirm {
    isVisible: boolean;
    isLoading: boolean;
}

export interface ICard {
    title: string;
    text: string;
    onPress: () => void;
    styles?: any;
    icon: any;
}

export interface File {
    uri?: string;
    name?: string;
    type?: string;
}

export interface ILetters {
    id_permohonan_surat: string;
    jenis_surat: string;
    status: string;
    tanggal: string;
    onPress: () => void;
    onDestroy: () => void;
}



