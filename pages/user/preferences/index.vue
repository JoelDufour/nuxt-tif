<template>
    <div class="container-fluid">
        <!-- The Modal Paramètre -->
        <div id="modalBox">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <span class="modal-title">Tes Paramètres</span>
                        <nuxt-link to="/home">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="white-text"><i class="fa fa-arrow-circle-left"></i></span>
                            </button>
                        </nuxt-link>         
                    </div>
                    <!-- Modal body -->
                    <div id="modalBoxContent" class="modal-body">
                        <div class="flex-container-modal-MyTeam">
                            <h1>Infos et/ou besoin d'aide ?</h1>
                        </div>
                        <div class="flex-container-modal-Parametre">
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Musique
                                </div>
                                <div class="columnParametreButtonYes">
                                    Oui
                                </div>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Son
                                </div>
                                <div class="columnParametreButtonNo">
                                    Non
                                </div>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Facebook
                                </div>
                                <div class="columnParametreButtonYes">
                                    En ligne
                                </div>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Google+
                                </div>
                                <div class="columnParametreButtonNo">
                                    Hors ligne
                                </div>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Langues
                                </div>
                                <nuxt-link to="/language" class="columnParametreButton">
                                    Français
                                </nuxt-link>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Pseudo
                                </div>
                                <nuxt-link to="/pseudo" class="columnParametreButton">
                                    Pseudo1234567
                                </nuxt-link>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Année de naissance
                                </div>
                                <nuxt-link to="/birth" class="columnParametreButton">
                                    1998
                                </nuxt-link>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <div class="columnParametreTexte">
                                    Nationalité
                                </div>
                                <nuxt-link to="/country" class="columnParametreButton">
                                    Suisse
                                </nuxt-link>
                            </div>
                        </div><!-- /.flex-container -->
                    </div><!-- /.modal-body -->
                    <div id="modalAvatar" class="modal-body">
                        <div class="flex-container-modal-Parametre">
                            <div class="flex-container-modal-Niveau">
                                <nuxt-link to="#" class="columnParametreButtonGd">
                                    Aide / Assistance
                                </nuxt-link>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <nuxt-link to="#" class="columnParametreButtonGd">
                                    Confidentialité
                                </nuxt-link>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <nuxt-link to="#" class="columnParametreButtonGd">
                                    Conditions d'utilisation
                                </nuxt-link>
                            </div>
                            <div class="flex-container-modal-Niveau">
                                <nuxt-link to="#" class="columnParametreButtonGd">
                                    Crédit
                                </nuxt-link>
                            </div>
                        </div>  
                    </div>
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <nuxt-link to="/home">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Fermer</button>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div><!-- /#modalBox -->
        <!-- End Modal Paramètre -->
    </div><!-- /.container-fluid -->
</template>

<script>
    export default {
        layout: 'layoutFront',
    }
</script>

<style>

</style>