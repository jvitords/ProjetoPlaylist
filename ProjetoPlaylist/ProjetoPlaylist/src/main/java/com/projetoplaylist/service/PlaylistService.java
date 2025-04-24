package com.projetoplaylist.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoplaylist.entities.Music;
import com.projetoplaylist.entities.Playlist;
import com.projetoplaylist.entities.dto.playlistdto.PlaylistGetDTO;
import com.projetoplaylist.entities.dto.playlistdto.PlaylistPostDTO;
import com.projetoplaylist.repository.MusicRepository;
import com.projetoplaylist.repository.PlaylistRepository;
import com.projetoplaylist.service.exception.NotFoundException;

@Service
public class PlaylistService {
	
	@Autowired
	PlaylistRepository playlistRepository;
	@Autowired
	MusicRepository musicRepository;
	
	public PlaylistService() {
		super();
	}

	public PlaylistService(PlaylistRepository playlistRepository) {
		this.playlistRepository = playlistRepository;
	}
	
	public Playlist fromPlaylist(PlaylistPostDTO playlistDTO) {
		
		Playlist playlist = new Playlist();
		playlist.setName(playlistDTO.getName());
		playlist.setGenre(playlistDTO.getGenre());
		return playlist;
	}
	
	public void atualizarQuantidadeDeMusicasNaPlaylist(Playlist playlist) {
		playlist.setQuantityMusic(playlist.getListMusics().size());
		playlistRepository.save(playlist);
	}
	
	public List<Playlist> findAllPlaylist() { // esse mostra todas as informações
		
		return playlistRepository.findAll();
	}
	
	public List<PlaylistGetDTO> findAllGetPlaylist() { // esse é um DTO sem mostrar o ID da playlist para o usuário
		
		List<Playlist> list = playlistRepository.findAll();
		List<PlaylistGetDTO> listGet = new ArrayList<>();
		for (Playlist p : list) {
			PlaylistGetDTO playlistGetDTO = new PlaylistGetDTO(p);
			listGet.add(playlistGetDTO);
		}
		return listGet;
	}
	
	public Playlist findById(Long id) {
		
		return playlistRepository.findById(id).orElseThrow(() -> new com.projetoplaylist.service.exception.NotFoundException("Id não encontrado."));
	}
	
	public List<Playlist> findByName(String name) {
		
		return playlistRepository.findByNameContainingIgnoreCase(name);
	}
	
	public void saveNewPlaylist(Playlist playlist) {
		if(playlistRepository.existsByNameIgnoreCase(playlist.getName())) {
			throw new IllegalArgumentException("Não é possivel adicionar essa playlist, pois já existe uma com esse nome.");
		}
		atualizarQuantidadeDeMusicasNaPlaylist(playlist);
		playlistRepository.save(playlist);
	}

	public Playlist updatePlaylist(Long id, PlaylistPostDTO dto) {
	    Playlist playlist = findById(id); // já lança NotFoundException se não achar

	    boolean isNameBlank = dto.getName() == null || dto.getName().isBlank();
	    boolean isGenreBlank = dto.getGenre() == null || dto.getGenre().isBlank();

	    if (!isNameBlank) {
	        // Evita duplicar nome com outra playlist
	        if (!playlist.getName().equalsIgnoreCase(dto.getName()) &&
	            playlistRepository.existsByNameIgnoreCase(dto.getName())) {
	            throw new IllegalArgumentException("Já existe uma playlist com esse nome.");
	        }
	        playlist.setName(dto.getName().trim());
	    }

	    if (!isGenreBlank) {
	        playlist.setGenre(dto.getGenre().trim());
	    }

	    atualizarQuantidadeDeMusicasNaPlaylist(playlist);
	    return playlistRepository.save(playlist);
	}

	
	public void delete(Long id) {
		
		if(id != null) {
			playlistRepository.deleteById(id);
		}
		else {
			throw new NotFoundException("Playlist não encontrada.");
		}
	}
	
	public void addMusicInPlaylist(Long idPlaylist, Long idMusic) {
		
		Playlist playlist = playlistRepository.findById(idPlaylist).orElseThrow(() -> new NotFoundException("Id da Playlist não encontrado."));
		Music music = musicRepository.findById(idMusic).orElseThrow(() -> new NotFoundException("Id da Music não encontrado."));;
		playlist.getListMusics().add(music);
		atualizarQuantidadeDeMusicasNaPlaylist(playlist);
		playlistRepository.save(playlist);
	}
	
	public void deleteMusicInPlaylist(Long idPlaylist, Long idMusic) {
		Playlist playlist = playlistRepository.findById(idPlaylist).orElseThrow(() -> new NotFoundException("Id da Playlist não encontrado."));
		Music music = musicRepository.findById(idMusic).orElseThrow(() -> new NotFoundException("Id da Music não encontrado."));;
		playlist.getListMusics().remove(music);
		atualizarQuantidadeDeMusicasNaPlaylist(playlist);
		playlistRepository.save(playlist);
	}
}
