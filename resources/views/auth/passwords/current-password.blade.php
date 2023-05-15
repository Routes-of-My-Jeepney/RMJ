@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('パスワード変更') }}</div>

                    <div class="card-body mx-5 my-4">
                        <form method="POST" action="{{ route('current_password.update') }}">
                            @csrf
                            @method('PUT')

                            <div class="form-group row mb-4">
                                <label for="current-password"
                                    class="col-md-4 col-form-label text-md-right">{{ __('現在のパスワード') }}</label>

                                <div class="col-md-6">
                                    <input id="current-password" type="password"
                                        class="form-control @error('current-password') is-invalid @enderror"
                                        name="current-password" required autocomplete="current-password" autofocus>

                                    @error('current-password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row mb-4">
                                <label for="password"
                                    class="col-md-4 col-form-label text-md-right">{{ __('新しいパスワード') }}</label>

                                <div class="col-md-6">
                                    <input id="password" type="password"
                                        class="form-control @error('password') is-invalid @enderror" name="password"
                                        required autocomplete="new-password">

                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row mb-4">
                                <label for="password-confirm"
                                    class="col-md-4 col-form-label text-md-right">{{ __('確認用パスワード') }}</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control"
                                        name="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0 py-3">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        {{ __('パスワードを変更する') }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
