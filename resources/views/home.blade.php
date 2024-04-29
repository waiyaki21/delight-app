@extends('layouts.app')

@section('content')
  <main-body
    v-bind:catfiles         = "{{ $catergories }}"
  ></main-body>
@endsection
