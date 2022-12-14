<template>
    <div class="container_body">
        <div id="cards_inventory">
            <div v-for="i in producto" :key="'producto' + i.id" class="card" style="width: 18rem">
                <div class="imgBx card-img-top">
                    <!-- <img id="image" :src="c.image" class="img-fluid rounded-start" alt="..." /> -->

                    <!-- Image client exist and is not loading a new image -->
                    <img v-if="i.image && !i.url" :src="axios.defaults.baseURL + i.image" class="imagenes image-profile"
                        :id="'client' + i.id" />
                    <!-- Image client exist and uploaded a new image -->
                    <img v-if="i.url && !loading" :src="i.url" class="image-profile" :id="'client' + i.id" />

                    <!-- Image client not exist and is not loading a new image -->
                    <span v-if="!i.image && !loading" :id="'client' + i.id"
                        class="material-symbols-outlined default-profile">
                        account_circle
                    </span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ i.name }}</h5>
                    <div class="card-text">
                        <span id="span">
                            <p>{{ i.description }}</p>
                            <p>${{ i.price }}</p>
                        </span>
                        <span id="span">
                            <p>cantida:{{ i.amount }}</p>
                            <p>code:{{ i.code }}</p>
                        </span>
                    </div>
                    <span id="span2">
                        <button id="editar" type="button" data-bs-toggle="modal" data-bs-target="#modal-edit"
                            @click="edit_clients(i)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <a href="#" class="btn btn-primary">delete</a>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- //////////////////////////////// -->
    <div class="modal fade" id="modal-edit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="color: white">Edit client</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Image management -->
                    <section class="photo-container">
                        <div class="photo-prev">
                            <input type="file" id="edit-client-input" @change="show_image" style="display: none" />

                            <!-- Image client exist and is not loading a new image -->
                            <div class="preview" v-if="form.url && !loading">
                                <span class="material-symbols-outlined clear-image"
                                    @click="clear_image('edit-client-input')">
                                    close
                                </span>
                                <img @click="open_browser('edit-client-input')" :src="form.url" />
                            </div>
                            <!-- Image client not exist and is not loading a new image -->
                            <span v-if="!form.url && !loading" class="material-symbols-outlined"
                                @click="open_browser('edit-client-input')">
                                account_circle
                            </span>
                            <div v-if="loading" class="loading" @click="open_browser('edit-client-input')"></div>
                            <!-- User can stop the image loading -->
                            <span v-if="loading" class="image_text" :class="{ stop: loading }" @click="stop_loading()"
                                @mouseover="image_text = 'Stop loading!'" @mouseleave="image_text = 'Loading...'">{{
                                        image_text
                                }}</span>
                            <span v-if="!loading" class="image_text">Your profile photo</span>
                        </div>
                        <div class="form-text" v-if="errors.image">
                            {{ errors.image[0] }}
                        </div>
                    </section>
                    <!-- Image management -->
                    <form class="form-tarifas">
                        <div id="izq">
                            <div class="form-floating mb-3">
                                <input type="text" name="name" v-model="form.name" class="form-control"
                                    id="floatingInput1-edit" />
                                <label for="floatingInput1-edit">name</label>
                                <span style="color: aliceblue" v-if="errors.name">
                                    {{ errors.name }}</span>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" name="email" v-model="form.price" class="form-control"
                                    id="floatingInput2-edit" placeholder="name@example.com" />
                                <label for="floatingInput2-edit"> email</label>
                                <span style="color: aliceblue" v-if="errors.price">
                                    {{ errors.price }}</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="update(e)">
                        update
                    </button>

                    <!-- <button type="button" class="btn btn-primary " @click="store()" data-bs-dismiss="modal"> created</button> -->
                </div>
            </div>
        </div>
    </div>



</template>
<style scoped>
@import "../../assets/css/inventory.css";
</style>

<script>
export default {
    mounted() {
        if (localStorage.user) {
            this.user = JSON.parse(localStorage.user);
            this.form.user_id = this.user.id;
            this.form.companies_id = this.user.companies_id;
        } else {
            this.$router.push({
                name: "Login",
                params: { message: rs.data.message },
            });
        }

        this.product();
    },
    data() {
        return {
            producto: [],
            alert: "",

            user: null,
            toast: null,
            modal: null,
            form_copy: {},
            loading: false,
            image_text: "Loading image...",
            alert: "",
            modal_create: null,
            form: {
                id: null,
                name: "",
                email: "",
                roles_id: "",
                password: "",
                password_confirmation: "",
                companies_id: "",
                user_id: "",
                // images //
                image: "",
                url: null,
                preview: null,
                updated: null,
            },
            errors: {},
        };
    },

    methods: {
        reset_form() {
            this.form = {
                image: "",
                name: "",
                price: "",
                roles_id: this.form_copy.roles_id,
                password: "",
                password_confirmation: "",
                companies_id: this.form_copy.companies_id,
                user_id: null,
                // images //
                url: null,
                preview: null,
                updated: null,
            };
        },
        prepare_elements(name) {
            const myModal = document.getElementById(name); //Nombre del modal
            const myAlert = document.querySelector(".toast");
            this.modal = bootstrap.Modal.getInstance(myModal);
            this.toast = new bootstrap.Toast(myAlert);
        },

        async product() {
            let companies_id = this.form.companies_id;

            try {
                let rs = await this.axios.get(
                    `/api/products/?companies_id=${companies_id}`,
                    {
                        headers: {
                            // Authorization: "Bearer " + localStorage.token,
                            "Content-Type": "multipart/form-data", //Permite enviar imágenes
                        },
                    }
                );

                this.producto = rs.data.productos;
                console.log(rs.data.productos);
            } catch (e) {
                console.log(e);
            }
        },

        edit_clients(i) {
            this.form = i;
            console.log(i)
            this.form.preview = false;
            this.form.updated = null;
            this.form.url = this.form.image
                ? this.axios.defaults.baseURL + this.form.image
                : null;
            this.form_copy = Object.assign({}, this.form);

            this.image_text = "You profile photo";
            this.loading = false;
        },


        async update() {
            const modal1 = document.getElementById("modal-edit");
            this.modal_edit = bootstrap.Modal.getInstance(modal1);
            try {
                console.log(this.form)
                const id = this.form.id;
                const res = await this.axios.post(`/api/inventory/update/${id}`, this.form,
                    {
                        headers: {
                            //  Authorization: "Bearer " + localStorage.token,
                            "Content-Type": "multipart/form-data", //Permite enviar imágenes
                        },
                    }
                );
                this.product();
                this.reset_form()
                this.modal_edit.hide();
                this.alert = res.data.message;
                this.clear_image("edit-client-input");

                this.modal.hide();
                this.toast.show();
            } catch (e) {
                console.log(e)
            }
        },

        //////////////////////////////////
        cancel_form() {
            Object.assign(this.client, this.form_copy);
            this.loading = false;
            this.form.updated = null;
        },

        open_browser(input_name) {
            const input = document.getElementById(input_name);
            input.click();
            this.loading = true;
            this.form.updated = null;
            this.image_text = "Loading...";
        },

        show_image(e) {
            if (e.target.files[0]) {
                console.log("updated!");
                this.form.updated = true;

                this.form.image = e.target.files[0];
                this.form.url = URL.createObjectURL(e.target.files[0]);
                console.log(this.form.image)
            } else {
                console.log("No se seleccionó ninguna imagen!!");
                this.form.url = this.form_copy.url;
            }

            this.loading = false;
        },

        clear_image(input_name) {
            this.form.image = null;
            this.form.updated = true;
            this.form.url = null;
            document.getElementById(input_name).value = null; //clear input file
        },

        stop_loading() {
            console.log("cancelaste la carga!!");
            this.form.url = this.form_copy.url;
            this.loading = false;
        },
    },
};
</script>
