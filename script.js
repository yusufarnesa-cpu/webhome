const SUPABASE_URL =
    "https://hqzishiazabguknallei.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_r8rspBje6vjTvUsF9lKYzA_SakK9CD5";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );



// =========================
// LOAD MATERI TERBARU
// =========================

async function loadLatestMaterials() {

    const container =
        document.getElementById(
            "latest-materials"
        );


    if (!container) return;


    const {
        data,
        error
    } =
        await supabaseClient

            .from("materials")

            .select("*")

            .eq(
                "status",
                "published"
            )

            .order(
                "created_at",
                {
                    ascending: false
                }
            )

            .limit(6);



    // Jika terjadi error

    if (error) {

        console.error(
            "Gagal mengambil materi:",
            error
        );


        container.innerHTML = `

            <div class="loading">

                Gagal memuat materi.

            </div>

        `;


        return;

    }



    // Jika belum ada materi

    if (
        !data ||
        data.length === 0
    ) {

        container.innerHTML = `

            <div class="loading">

                Belum ada materi yang tersedia.

            </div>

        `;


        return;

    }



    // Tampilkan materi

    container.innerHTML =

        data.map(
            material => {

                return `

                    <article
                        class="material-card"
                    >

                        <h3>

                            ${escapeHtml(
                                material.title
                            )}

                        </h3>


                        <div
                            class="material-meta"
                        >

                            ${
                                material.subject
                                ? `

                                    <span
                                        class="material-tag"
                                    >

                                        ${escapeHtml(
                                            material.subject
                                        )}

                                    </span>

                                `
                                : ""
                            }


                            ${
                                material.semester
                                ? `

                                    <span
                                        class="material-tag"
                                    >

                                        ${escapeHtml(
                                            material.semester
                                        )}

                                    </span>

                                `
                                : ""
                            }


                            ${
                                material.topic
                                ? `

                                    <span
                                        class="material-tag"
                                    >

                                        ${escapeHtml(
                                            material.topic
                                        )}

                                    </span>

                                `
                                : ""
                            }

                        </div>


                        <p>

                            ${escapeHtml(
                                material.description ||
                                "Belum ada deskripsi materi."
                            )}

                        </p>

                    </article>

                `;

            }
        ).join("");

}



// =========================
// LOAD OSCE TERBARU
// =========================

async function loadLatestOSCE() {

    const container =
        document.getElementById(
            "latest-osce"
        );


    if (!container) return;



    const {
        data,
        error
    } =
        await supabaseClient

            .from("osce_stations")

            .select(`
                id,
                title,
                description,
                objective
            `)

            .order(
                "created_at",
                {
                    ascending: false
                }
            )

            .limit(3);



    // Jika error

    if (error) {

        console.error(
            "Gagal mengambil station OSCE:",
            error
        );


        container.innerHTML = `

            <div class="loading">

                Gagal memuat station OSCE.

            </div>

        `;


        return;

    }



    // Jika belum ada station

    if (
        !data ||
        data.length === 0
    ) {

        container.innerHTML = `

            <div class="loading">

                Belum ada station OSCE.

            </div>

        `;


        return;

    }



    // Tampilkan station

    container.innerHTML =

        data.map(
            station => {

                return `

                    <article
                        class="material-card"
                    >

                        <div
                            class="feature-icon"
                        >
                            🩺
                        </div>


                        <h3>

                            ${escapeHtml(
                                station.title
                            )}

                        </h3>


                        <p>

                            ${escapeHtml(
                                station.description ||
                                station.objective ||
                                "Station keterampilan klinis."
                            )}

                        </p>


                        <a
                            href="osce-detail.html?id=${encodeURIComponent(
                                station.id
                            )}"
                        >

                            Lihat Station →

                        </a>

                    </article>

                `;

            }
        ).join("");

}



// =========================
// KEAMANAN HTML
// =========================

function escapeHtml(text) {

    return String(text ?? "")

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



// =========================
// JALANKAN HOMEPAGE
// =========================

loadLatestMaterials();

loadLatestOSCE();
