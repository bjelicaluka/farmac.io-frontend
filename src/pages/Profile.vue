<template>
    <div class="col-8 card" style="min-height:90vh;">
        <div class="card card-nav-tabs card-plain" >
            <div class="card-header card-header-primary">
                <div class="nav-tabs-navigation">
                    <div class="nav-tabs-wrapper">
                        <ul class="nav nav-tabs" data-tabs="tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#profile" data-toggle="tab"><i class="material-icons">account_circle</i>Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#password" data-toggle="tab"><i class="material-icons">lock</i>Password</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="tab-content text-center">
                    <div class="tab-pane active" id="profile">
                        <UpdateProfileForm/>
                    </div>
                    <div class="tab-pane" id="password">
                        <div class=" justify-content-center align-items-center">
                            <ChangePasswordForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import UpdateProfileForm from '../components/Forms/UpdateProfileForm'
import ChangePasswordForm from '../components/Forms/ChangePasswordForm'

export default {
    components: {
        UpdateProfileForm,
        ChangePasswordForm
    }
}
</script>

