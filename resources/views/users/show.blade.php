@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header"><strong>{{ __('マイページ') }}</strong></div>
                    <div class="card-body  mx-5 my-4">
                        <form method="POST" action="{{ route('users.update', $user->id) }}" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')
                            <div class="form-group mb-4">
                                <label for="profile-img" class="d-flex justify-content-around align-items-center">
                                    @if ($user->profile_img === null)
                                        <div class="col justify-content-between">
                                            <img class="rounded-circle" style="object-fit: cover;" src="{{ asset('user-icon.png') }}" alt="プロフィール画像"
                                            width="100" height="100" id="preview-profile-img">
                                        </div>
                                        <div class="col">
                                            <button class="btn btn-primary my-4" type="button"
                                                id="profile-img-set-btn">プロフィール画像の設定</button>
                                        </div>
                                    @else
                                        <div class="col">
                                            <img class="rounded-circle" style="object-fit: cover;" src="{{ Storage::url($user->profile_img) }}"
                                                alt="プロフィール画像" width="100" height="100" id="preview-profile-img">
                                        </div>
                                        <div class="col">
                                            <a class="btn btn-primary mb-3" type="button"
                                                id="profile-img-change-btn">プロフィール画像の変更</a>
                                            

                                        </div>
                                    @endif
                                    <input id="profile-img" name="profile-img" type="file"
                                        class="form-control @error('profile-img') is-invalid @enderror"
                                        style="display:none;" value="" accept="image/png, image/jpeg">
                                </label></span>
                                @error('profile-img')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                                <span>
                            </div>
                            <div class="form-group mb-4">
                                <label for="exampleInputPassword1">メールアドレス</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Email"
                                    value="{{ $user->email }}">
                            </div>
                            <div class="form-group mb-4">
                                <button type="submit" class="btn btn-primary px-5">プロフィール情報を変更</button>
                            </div>
                        </form>
                        <form method="POST" action="{{ route('delete-profile-image', $user->id) }}">
                            @csrf                            
                            <button class="btn btn-outline-primary" type="submit" id="delete-profile-image-btn" name="delete-profile-img">プロフィール画像の削除</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
@endsection
