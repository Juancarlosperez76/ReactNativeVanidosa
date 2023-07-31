import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import ButtonPrimary from './ButtonPrimary';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Código "Lista con viñetas" personalizada
interface ListItemProps {
  text: string;
}

const ListItem = ({ text }: ListItemProps) => (
  <View style={styles.listItem}>

    <View style={styles.contentDot} >
      <Ionicons style={styles.dot} name='ellipse-sharp' />
    </View>

    <View style={styles.contentListText}>
      <Text style={styles.listText}>{text}</Text>
    </View>

  </View>
);
// Código "Lista con viñetas" personalizada fin

type TermsAndConditionsModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TermsAndConditionsModal = ({ modalVisible, setModalVisible }: TermsAndConditionsModalProps) => {

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >

        <ScrollView style={styles.contentTermsAndConditions}>

          <Text style={styles.mainTitleTermsAndConditions}>
            POLÍTICA DE PRIVACIDAD DE{'\n'}"VANIDOSA SPA"
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Política de privacidad
          </Text>

          <Text style={styles.textTermsAndConditions}>
            El sitio web Vanidosa SPA es propiedad de Vanidosa SPA y Belleza, que es un controlador de datos de tus datos personales.{'\n'}{'\n'}
            Hemos adoptado esta Política de privacidad, que determina cómo procesamos la información recopilada por Vanidosa SPA, que también proporciona las razones por las que debemos recopilar ciertos datos personales sobre ti. Por lo tanto, debes leer esta Política de privacidad antes de usar el sitio web de Vanidosa SPA.{'\n'}{'\n'}
            Cuidamos tus datos personales y nos comprometemos a garantizar su confidencialidad y seguridad.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Información personal que recopilamos:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Cuando visitas Vanidosa SPA, recopilamos automáticamente cierta información sobre tu dispositivo, incluida información sobre tu navegador web, dirección IP, zona horaria y algunas de las cookies instaladas en tu dispositivo. Además, a medida que navegas por el sitio, recopilamos información sobre las páginas web individuales o los productos que ves, qué sitios web o términos de búsqueda te remitieron al sitio y cómo interactúas con él. Nos referimos a esta información recopilada automáticamente como "Información del dispositivo". Además, podemos recopilar los datos personales que nos proporcionas (incluidos, entre otros, nombre, apellido, dirección, información de pago, etc.) durante el registro para poder cumplir con el acuerdo.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            ¿Por qué procesamos tus datos?
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Nuestra máxima prioridad es la seguridad de los datos del cliente y, como tal, podemos procesar solo los datos mínimos del usuario, solo en la medida en que sea absolutamente necesario para mantener el sitio web. La información recopilada automáticamente se utiliza solo para identificar casos potenciales de abuso y establecer información estadística sobre el uso del sitio web. Esta información estadística no se agrega de tal manera que identifique a ningún usuario en particular del sistema.{'\n'}{'\n'}
            Puedes visitar el sitio sin decirnos quién eres ni revelar ninguna información por la cual alguien pueda identificarte como una persona específica. Sin embargo, si deseas utilizar algunas de las funciones del sitio web, o deseas recibir nuestro boletín informativo o proporcionar otros detalles al completar un formulario, puedes proporcionarnos datos personales, como tu correo electrónico, nombre, apellido, ciudad de residencia, organización y número de teléfono. Puedes optar por no proporcionar tus datos personales, pero es posible que no puedas aprovechar algunas de las funciones del sitio web. Por ejemplo, no podrás recibir nuestro boletín ni contactarnos directamente desde el sitio web. Los usuarios que no estén seguros de qué información es obligatoria pueden ponerse en contacto con nosotros a través de vanidosaspa@gmail.com.
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Tus derechos:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Si eres residente europeo, tienes los siguientes derechos relacionados con tus datos personales:{'\n'}
          </Text>

          <ListItem text="El derecho a ser informado." />
          <ListItem text="El derecho de acceso." />
          <ListItem text="El derecho a la rectificación" />
          <ListItem text="El derecho a borrar." />
          <ListItem text="El derecho a restringir el procesamiento." />
          <ListItem text="El derecho a la portabilidad de datos." />
          <ListItem text="El derecho a oponerte." />
          <ListItem text="Derechos en relación con la toma de decisiones automatizada y la elaboración de perfiles." />

          <Text></Text>

          <Text style={styles.textTermsAndConditions}>
            Si deseas ejercer este derecho, comunícate con nosotros a través de la información de contacto a continuación.{'\n'}{'\n'}
            Además, si eres residente europeo, destacamos que estamos procesando tu información para cumplir con los contratos que podríamos tener contigo (por ejemplo, si realizas un pedido a través del sitio), o de otra manera para seguir nuestros intereses comerciales legítimos enumerados anteriormente. Además, ten en cuenta que tu información puede transferirse fuera de Europa, incluidos Canadá y Estados Unidos.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Enlaces a otros sitios web:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Nuestro sitio puede contener enlaces a otros sitios web que no son de nuestra propiedad ni están controlados por nosotros. Ten en cuenta que no somos responsables de dichos sitios web ni de las prácticas de privacidad de terceros. Te recomendamos que estés atento cuando abandones nuestro sitio web y leas las declaraciones de privacidad de cada sitio que pueda recopilar información personal.
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Seguridad de la información:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Aseguramos la información que proporcionas en servidores informáticos en un entorno controlado y seguro, protegido del acceso, uso o divulgación no autorizados. Mantenemos medidas de seguridad administrativas, técnicas y físicas razonables para proteger contra el acceso no autorizado, el uso, la modificación y la divulgación de datos personales bajo su control y custodia. Sin embargo, no se puede garantizar la transmisión de datos a través de Internet o redes inalámbricas.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Divulgación legal:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Divulgaremos cualquier información que recopilemos, usemos o recibamos si así lo requiere o lo permite la ley, como para cumplir con una citación o un proceso legal similar, y cuando creemos de buena fe que la divulgación es necesaria para proteger nuestros derechos, proteger tu seguridad o la seguridad de los demás, investigar el fraude o responder a una solicitud del gobierno.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Información de contacto:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Si deseas comunicarte con nosotros para comprender más sobre esta Política o deseas comunicarte con nosotros en relación con cualquier asunto sobre los derechos individuales y tu información personal, puedes enviarnos un correo electrónico a vanidosaspa@gmail.com.
          </Text>

          <Text style={styles.mainTitleTermsAndConditions}>
            TÉRMINOS Y CONDICIONES{'\n'}DE USO DEL SITIO{'\n'}"VANIDOSASPA.COM.CO"
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Términos y condiciones
          </Text>

          <Text style={styles.textTermsAndConditions}>
            ¡Bienvenido a Vanidosa SPA!{'\n'}{'\n'}
            Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Vanidosa SPA y Belleza, ubicado en https://vanidosaspa.com.co.{'\n'}{'\n'}
            Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Vanidosa SPA si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Cookies:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            El sitio web utiliza cookies para ayudar a personalizar tu experiencia en línea. Al acceder a Vanidosa SPA, aceptaste utilizar las cookies necesarias.{'\n'}{'\n'}
            Una cookie es un archivo de texto que un servidor de páginas web coloca en tu disco duro. Las cookies no se pueden utilizar para ejecutar programas o enviar virus a tu computadora. Las cookies se te asignan de forma exclusiva y solo un servidor web en el dominio que emitió la cookie puede leerlas.{'\n'}{'\n'}
            Podemos utilizar cookies para recopilar, almacenar y rastrear información con fines estadísticos o de marketing para operar nuestro sitio web. Tienes la capacidad de aceptar o rechazar cookies opcionales. Hay algunas cookies obligatorias que son necesarias para el funcionamiento de nuestro sitio web. Estas cookies no requieren tu consentimiento ya que siempre funcionan. Ten en cuenta que al aceptar las cookies requeridas, también aceptas las cookies de terceros, que podrían usarse a través de servicios proporcionados por terceros si utilizas dichos servicios en nuestro sitio web, por ejemplo, una ventana de visualización de video proporcionada por terceros e integrada en nuestro sitio web.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Licencia:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            A menos que se indique lo contrario, Vanidosa SPA y Belleza y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Vanidosa SPA. Todos los derechos de propiedad intelectual son reservados. Puedes acceder desde Vanidosa SPA para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.{'\n'}{'\n'}
            No debes:{'\n'}
          </Text>

          <ListItem text="Copiar o volver a publicar material de Vanidosa SPA." />
          <ListItem text="Vender, alquilar o sublicenciar material de Vanidosa SPA" />
          <ListItem text="Reproducir, duplicar o copiar material de Vanidosa SPA." />
          <ListItem text="Redistribuir contenido de Vanidosa SPA." />

          <Text></Text>

          <Text style={styles.textTermsAndConditions}>
            Este acuerdo comenzará el fecha presente.{'\n'}{'\n'}
            Partes de este sitio web ofrecen a los usuarios la oportunidad de publicar e intercambiar opiniones e información en determinadas áreas. Vanidosa SPA y Belleza no filtra, edita, publica ni revisa los comentarios antes de su presencia en el sitio web. Los comentarios no reflejan los puntos de vista ni las opiniones de Vanidosa SPA y Belleza, sus agentes y/o afiliados. Los comentarios reflejan los puntos de vista y opiniones de la persona que publica. En la medida en que lo permitan las leyes aplicables, Vanidosa SPA y Belleza no será responsable de los comentarios ni de ninguna responsabilidad, daños o gastos causados o sufridos como resultado de cualquier uso o publicación o apariencia de comentarios en este sitio web.{'\n'}{'\n'}
            Vanidosa SPA y Belleza se reserva el derecho de monitorear todos los comentarios y eliminar los que puedan considerarse inapropiados, ofensivos o que incumplan estos Términos y Condiciones.{'\n'}{'\n'}
            Garantizas y declaras que:
          </Text>

          <ListItem text="Tienes derecho a publicar comentarios en nuestro sitio web y tienes todas las licencias y consentimientos necesarios para hacerlo;" />
          <ListItem text="Los comentarios no invaden ningún derecho de propiedad intelectual, incluidos, entre otros, los derechos de autor, patentes o marcas comerciales de terceros;" />
          <ListItem text="Los comentarios no contienen ningún material difamatorio, calumnioso, ofensivo, indecente o ilegal de otro modo, que sea una invasión de la privacidad." />
          <ListItem text="Los comentarios no se utilizarán para solicitar o promover negocios o actividades comerciales personalizadas o presentes o actividades ilegales." />

          <Text></Text>

          <Text style={styles.textTermsAndConditions}>
            Por la presente, otorgas a Vanidosa SPA y Belleza una licencia no exclusiva para usar, reproducir, editar y autorizar a otros a usar, reproducir y editar cualquiera de tus comentarios en todas y cada una de las formas, formatos, o medios.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Hipervínculos a nuestro contenido:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Las siguientes organizaciones pueden vincularse a nuestro sitio web sin aprobación previa por escrito:{'\n'}
          </Text>

          <ListItem text="Agencias gubernamentales;" />
          <ListItem text="Motores de búsqueda;" />
          <ListItem text="Organizaciones de noticias;" />
          <ListItem text="Los distribuidores de directorios en línea pueden vincularse a nuestro sitio web de la misma manera que hacen hipervínculos a los sitios web de otras empresas que figuran en la lista; y" />
          <ListItem text="Empresas acreditadas en todo el sistema, excepto que soliciten organizaciones sin fines de lucro, centros comerciales de caridad y grupos de recaudación de fondos de caridad que no pueden hacer hipervínculos a nuestro sitio web." />

          <Text></Text>


          <Text style={styles.textTermsAndConditions}>
            Estas organizaciones pueden enlazar a nuestra página de inicio, a publicaciones o a otra información del sitio siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implique falsamente patrocinio, respaldo o aprobación de la parte vinculante y sus productos y/o servicios; y (c) encaja en el contexto del sitio de la parte vinculante.{'\n'}{'\n'}
            Podemos considerar y aprobar otras solicitudes de enlaces de los siguientes tipos de organizaciones:{'\n'}
          </Text>

          <ListItem text="Fuentes de información de consumidores y/o empresas comúnmente conocidas;" />
          <ListItem text="sitios de la comunidad .com;" />
          <ListItem text="asociaciones u otros grupos que representan organizaciones benéficas;" />
          <ListItem text="distribuidores de directorios en línea;" />
          <ListItem text="portales de Internet;" />
          <ListItem text="firmas de contabilidad, derecho y consultoría; e" />
          <ListItem text="instituciones educativas y asociaciones comerciales." />

          <Text></Text>

          <Text style={styles.textTermsAndConditions}>
            Aprobaremos las solicitudes de enlace de estas organizaciones si: (a) el enlace no nos haría vernos desfavorablemente a nosotros mismos ni a nuestras empresas acreditadas; (b) la organización no tiene registros negativos con nosotros; (c) el beneficio para nosotros de la visibilidad del hipervínculo compensa la ausencia de Vanidosa SPA y Belleza; y (d) el enlace está en el contexto de información general de recursos.{'\n'}{'\n'}
            Estas organizaciones pueden enlazar a nuestra página de inicio siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implique falsamente patrocinio, respaldo o aprobación de la parte vinculante y sus productos o servicios; y (c) encaja en el contexto del sitio de la parte vinculante.{'\n'}{'\n'}
            Si eres una de las organizaciones enumeradas en el párrafo 2 y estás interesada en vincularte a nuestro sitio web, debes informarnos enviando un correo electrónico a Vanidosa SPA y Belleza. Incluye tu nombre, el nombre de tu organización, la información de contacto, así como la URL de tu sitio, una lista de las URL desde las que tienes la intención de vincular a nuestro sitio web y una lista de las URL de nuestro sitio a las que te gustaría acceder. Espera 2-3 semanas para recibir una respuesta.{'\n'}{'\n'}
            Las organizaciones aprobadas pueden hacer hipervínculos a nuestro sitio web de la siguiente manera:{'\n'}
          </Text>

          <ListItem text="Mediante el uso de nuestro nombre corporativo; o" />
          <ListItem text="mediante el uso del localizador uniforme de recursos al que se está vinculando; o" />
          <ListItem text="usar cualquier otra descripción de nuestro sitio web al que está vinculado que tenga sentido dentro del contexto y formato del contenido en el sitio de la parte vinculante." />

          <Text></Text>

          <Text style={styles.textTermsAndConditions}>
            No se permitirá el uso del logotipo de Vanidosa SPA y Belleza u otro material gráfico para vincular sin un acuerdo de licencia de marca comercial.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Responsabilidad del contenido:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            No seremos responsables de ningún contenido que aparezca en tu sitio web. Aceptas protegernos y defendernos contra todas las reclamaciones que se presenten en tu sitio web. Ningún enlace(s) debe aparecer en ningún sitio web que pueda interpretarse como difamatorio, obsceno o criminal, o que infrinja, de otra manera viole o defienda la infracción u otra violación de los derechos de terceros.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Reserva de derechos:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Nos reservamos el derecho de solicitar que elimines todos los enlaces o cualquier enlace en particular a nuestro sitio web. Apruebas eliminar de inmediato todos los enlaces a nuestro sitio web cuando se solicite. También nos reservamos el derecho de modificar estos términos y condiciones y su política de enlaces en cualquier momento. Al vincular continuamente a nuestro sitio web, aceptas estar vinculado y seguir estos términos y condiciones de vinculación.{'\n'}
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Eliminación de enlaces de nuestro sitio web:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            Si encuentras algún enlace en nuestro sitio que sea ofensivo por cualquier motivo, puedes contactarnos e informarnos en cualquier momento. Consideraremos las solicitudes para eliminar enlaces, pero no estamos obligados a hacerlo ni a responder directamente.{'\n'}{'\n'}
            No nos aseguramos de que la información de este sitio web sea correcta. No garantizamos su integridad o precisión, ni prometemos asegurarnos de que el sitio web permanezca disponible o que el material en el sitio se mantenga actualizado.
          </Text>

          <Text style={styles.titleTermsAndConditions}>
            Exención de responsabilidad:
          </Text>

          <Text style={styles.textTermsAndConditions}>
            En la medida máxima permitida por la ley aplicable, excluimos todas las representaciones, garantías y condiciones relacionadas con nuestro sitio web y el uso de este. Nada en este descargo de responsabilidad:{'\n'}
          </Text>

          <ListItem text="limitará o excluirá nuestra responsabilidad o la tuya por muerte o lesiones personales;" />
          <ListItem text="limitará o excluirá nuestra responsabilidad o la tuya por fraude o tergiversación fraudulenta;" />
          <ListItem text="limitará cualquiera de nuestras responsabilidades o las tuyas de cualquier manera que no esté permitida por la ley aplicable; o" />
          <ListItem text="excluirá cualquiera de nuestras responsabilidades o las tuyas que no puedan estar excluidas según la ley aplicable." />

          <Text></Text>

          <Text style={styles.textTermsAndConditions}>
            Las limitaciones y prohibiciones de responsabilidad establecidas en esta sección y en otras partes de este descargo de responsabilidad: (a) están sujetas al párrafo anterior; y (b) regirá todas las responsabilidades que surjan en virtud de la exención de responsabilidad, incluidas las responsabilidades que surjan en el contrato, en agravio y por incumplimiento de la obligación legal.{'\n'}{'\n'}
            Siempre que el sitio web y la información y los servicios en el sitio se proporcionen de forma gratuita, no seremos responsables de ninguna pérdida o daño de cualquier naturaleza.{'\n'}
          </Text>

        </ScrollView>

        <View>
          <ButtonPrimary
            onPress={handleCloseModal} // onPress vacío, sin funcionalidad
            width={'100%'}
            height={48}
            backgroundColor={'#5B009D'}
            borderRadius={0}
            color={'#ffffff'}
            fontSize={14}
            fontWeight={'500'}
            letterSpacing={0.8}
            title={'ACEPTAR'}
          />
        </View>

      </Modal>

    </View>
  );
};

export default TermsAndConditionsModal;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentTermsAndConditions: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainTitleTermsAndConditions: {
    color: '#4e4e4e',
    paddingTop: 50,
    paddingBottom: 30,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  titleTermsAndConditions: {
    color: '#4e4e4e',
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: '800',
  },
  textTermsAndConditions: {
    color: '#4e4e4e',
    textAlign: 'justify',
    fontSize: 14,
  },
  // Código "Lista con viñetas" personalizada
  listItem: {
    flexDirection: 'row',
    width: '100%',
  },
  contentDot: {
    width: '4%',
  },
  dot: {
    paddingTop: 8,
    color: '#4e4e4e',
    fontSize: 6,
  },
  contentListText: {
    width: '96%',
  },
  listText: {
    color: '#4e4e4e',
    fontSize: 14,
  },
  // -----------------------------------------
});